import { ValidationErrorItem } from '@hapi/joi';

export interface IErrors {
    status: string
    errors: Partial<ValidationErrorItem>[]
}
