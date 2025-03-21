/**
 * 间隔执行队列
 */
export class IntervalQueue<T extends any[], U extends any> {
    private delay: number
    private timeout: number | undefined
    private fn: (...args: T) => U

    /**
     * @param fn 执行函数
     * @param delay 执行间隔
     * @param timeout 超时时间
     */
    constructor(fn: (...args: T) => U, delay: number, timeout?: number) {
        this.fn = fn
        this.delay = delay
        this.timeout = timeout
    }

    private queue: {
        args: T
        resolve: (value: Awaited<U>) => void
        reject: (reason?: any) => void
    }[] = []

    private async wait(delay = this.delay) {
        await new Promise(resolve => setTimeout(resolve, delay))
    }

    private isRunning = false

    private async run() {
        if (this.isRunning) return
        let item: (typeof this.queue)[number] | undefined
        while ((item = this.queue.shift())) {
            const { args, resolve, reject } = item
            this.isRunning = true
            try {
                resolve(await this.fn(...args))
            } catch (e) {
                reject(e)
            }
            await this.wait()
        }
        this.isRunning = false
    }

    /**
     * 执行一次fn
     * @param args fn的入参
     * @returns 返回fn的返回值的Promise
     */
    execute(...args: T) {
        return new Promise<Awaited<U>>((resolve, reject) => {
            this.queue.push({ args, resolve, reject })
            this.run()
            if (this.timeout) {
                setTimeout(() => {
                    reject(new Error('IntervalQueue timeout'))
                }, this.timeout)
            }
        })
    }
}
