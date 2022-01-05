class PlayerTurn {

    private shots: Array<number>
    private isLastTurn: boolean
    private remainingPins: number

    constructor(isLastTurn : boolean) {
        this.shots = new Array<number>()
        this.isLastTurn = isLastTurn
        this.remainingPins = 10
    }

    addPins(pinsNb: number): void {
        if (pinsNb < 0 || pinsNb > 10)
            throw new Error("invalid input")
        if (!Number.isInteger(pinsNb))
            throw new Error("invalid input")
        if (pinsNb === null || pinsNb === undefined)
            throw new Error("invalid input")
        if (this.isOver())
            throw new Error("your turn is over")
        if (pinsNb > this.remainingPins)
            throw new Error("total pins down cannot exceed 10")

        this.shots.push(pinsNb)
        this.remainingPins -= pinsNb       

        if(this.isLastTurn) {
            if(this.isStrike() && this.shots.length === 1)
                this.remainingPins = 10
            if(this.shots.length === 2) {
                if(this.isStrike() && this.shots[1] === 10)
                    this.remainingPins = 10
                if(this.isSpare())
                    this.remainingPins = 10
            }
        }
                
    }

    getShots() {
        return this.shots
    }

    pinsSum(): number {
        let sum = 0
        this.shots.forEach((shot) => {
            sum += shot
        })
        return sum
    }

    isOver(): boolean {
        if (this.isLastTurn)
            return this.shots.length === 3 || (this.shots.length === 2 && !this.isSpare() && !this.isStrike())
        else
            return this.shots.length === 2 || this.isStrike()
    }

    isStrike(): boolean {
        return this.shots.length >= 1 && this.shots[0] === 10
    }

    isSpare(): boolean {
        return (this.shots.length >= 2 && this.shots[0]+this.shots[1] === 10)
    }
}

export { PlayerTurn }
