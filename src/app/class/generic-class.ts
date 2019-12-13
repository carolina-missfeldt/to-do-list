export class GenericClass {
    public name: string;
    public id?: string;
    public done?: boolean; 

    constructor(value) {
        this.id = value.id;
        this.name = value.name;
        this.done = value.done ? value.done : false;
    }
}