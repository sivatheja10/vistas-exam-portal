export class Option {
    id: number;
    questionId: number;
    name: string;
    A: string;
    B: string;
    C: string;
    D: string;
    Answer: string;
    selected: string;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.questionId = data.questionId;
        this.name = data.name;
        this.Answer = data.Answer;
    }
}
