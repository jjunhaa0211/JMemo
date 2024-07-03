import { Tag } from "./tag";

export interface Note {
    title: string;
    content: string;
    tags: Tag[];
    color: string;
    priority: string;
    isPinned: boolean;
    isRead: boolean;
    date: string;
    createdTime: number;
    editedTime: null | number;
    id: string;
}