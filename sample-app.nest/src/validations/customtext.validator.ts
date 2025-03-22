import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomTextValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return text === 'valid'; // Пример кастомной логики
  }

  defaultMessage(args: ValidationArguments) {
    return 'Text is not valid!';
  }
}