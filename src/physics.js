export class Physics {

    constructor(player) {
        this.player = player;

        // Grip values
        this.frontGrip = 1.0;
        this.rearGrip = 0.95;

        this.driftGrip = 0.65;

        this.isDrifting = false;
        this.driftScore = 0;
        this.boost = 0;
    }

    update(delta) {

        const steering =
            this.player.input.left || this.player.input.right;

        // Automatic drift
        if (Math.abs(this.player.speed) > 40 && steering) {

            this.isDrifting = true;
            this.rearGrip = this.driftGrip;

        } else {

            this.isDrifting = false;
            this.rearGrip = 0.95;

        }

        // Award drift points and charge boost
        if (this.isDrifting) {

            this.driftScore += Math.abs(this.player.speed) * delta;

            this.boost = Math.min(
                100,
                this.boost + 15 * delta
            );

        }

        // Small speed loss while drifting
        if (this.isDrifting) {
            this.player.speed *= 0.998;
        }

    }

}
