import { registerDecorator } from 'class-validator';
import { ProfanityFilter } from './profanity-filter.js';
const filter = new ProfanityFilter();
export function NoProfanity(validationOptions) {
    return function (object, propertyName) {
        registerDecorator({
            name: 'noProfanity',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    if (typeof value !== 'string')
                        return true;
                    return !filter.hasProfanity(value);
                },
                defaultMessage() {
                    return 'O campo contém linguagem inadequada.';
                },
            },
        });
    };
}
