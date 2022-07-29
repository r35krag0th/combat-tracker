export class ActorDetails {
    name: string;
    visible: boolean;
    canBeDeleted: boolean;

    constructor(name: string, show=true, canBeDeleted=true) {
        this.name = name;
        this.visible = show;
        this.canBeDeleted = canBeDeleted;
    }
}