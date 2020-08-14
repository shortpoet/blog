// base type

interface Rule {
  type: 'required' | 'length' | 'match'
}

// enforce that all types have minimum type value in Rule
interface Require extends Rule {
  type: 'required'
} 

interface MinMaxOptions {
  min: number
  max: number
}

interface Length extends Rule {
  type: 'length'
  options: MinMaxOptions
}

interface Confirm extends Rule {
  type: 'match'
  reference: string
}

export function required(): Require {
  return {
    type: 'required'
  }
}
export function length(options: MinMaxOptions): Length {
  return {
    type: 'length',
    options
  }
}
export function match(reference: string): Confirm {
  return {
    type: 'match',
    reference
  }
}

// a union of all the validators available
type Validator = Require | Length | Confirm

export interface Status {
  valid: boolean
  // nullable bec if valid no need for error
  message?: string
}


// validators is an arr ay to be able to specify multiple validators for single input
// eg min / max length, format, email, etc
export function validate(value: string, validators: Validator[]): Status {

  for (const validator of validators) {

    // check for required validator
    if (validator.type === 'required' && (!value || !value.length)) {
      return {
        valid: false,
        message: 'This field is required'
      }
    }

    // check for length validator
    if (validator.type === 'length' && (value.length < validator.options.min || value.length > validator.options.max)) {
      return {
        valid: false,
        message: `This field is has a minimum length of ${validator.options.min} and a maximum length of ${validator.options.max}`
      }
    }

    // check for match validator
    if (validator.type == 'match' && value != validator.reference) {
      return {
        valid: false,
        message: `Passwords must match`
      }
    }

  }

  return {
    // by default
    valid: true
  }
}