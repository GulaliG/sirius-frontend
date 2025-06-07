export interface Question {
    id: string;
    type: "frequency" | "rating5" | "textarea";
    label: string;
}

export interface Section {
    sectionId: string;
    title: string;
    questions: Question[];
}

export type SurveyFormData = {
    [field: string]: string;
};

export type AnswerValue = string;

