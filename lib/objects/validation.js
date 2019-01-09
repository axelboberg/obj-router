/**
 * Axel Boberg © 2018
 */

/**
 *  {
 *    'key': { required: true, default: 'val1', allowed: ['val1', 'val2'], custom: function (val){ return true } }
 *  }
 */

const validators = {
  'required': function (opt, val) {
    if (opt && !val) return [ false, 'Value is required' ]
    return [ true ]
  },
  'type': function (opt, val) {
    const targetType = String(opt).toLowerCase()
    const valueType = typeof val

    if (valueType === targetType) return [ true ]
    return [false, `Expected value of type ${targetType} but got ${valueType}`]
  },
  'allowed': function (opt, val) {
    if (typeof opt !== 'object' || !Array.isArray(opt)) return [ true ]
    if (opt.includes(val)) return [ true ]
    return [false, 'Value is not allowed']
  },
  'custom': function (opt, val) {
    if (typeof opt !== 'function') return [ true ]
    return opt(val)
  }
}

/**
 * Validate an object agains a validation object
 * @param { Object } obj An object to validate, must not be an array
 * @param { Object } rules A validation object with a set of rules
 * @returns { Object } An object specifing keys not passing validation and its reasons
 */
exports.validate = (obj, rules) => {
  const notes = {}
  const keys = Object.keys(rules)

  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i]
    const val = obj[key]
    const ruleList = Object.entries(rules[key])

    // Let all modifiers validate the value
    for (let j = 0, rulesNum = ruleList.length; j < rulesNum; j++) {
      let [ rule, opt ] = ruleList[j]
      rule = rule.toLowerCase()

      if (typeof validators[rule] !== 'function') continue

      /**
       * Validate the value
       */
      const [ res, msg ] = validators[rule](opt, val)

      if (res) continue

      /**
       * Add a note to the output that
       * the value failed the validation
       */
      if (!notes[key]) notes[key] = []
      notes[key].push({
        'rule': rule,
        'reason': msg
      })
    }
  }

  return notes
}

/**
 * Validate and replace the values for keys in an object that failed
 * the validation or keys that are missing with a specified default value
 * @param { Object } obj An object to validate and modify
 * @param { Object } rules A validation object with a set of rules and defaults
 * @returns { Object } The object ensured to meet the specified rules
 */
exports.ensure = (obj, rules) => {
  const failedKeys = exports.validate(obj, rules)
  const validatedKeys = Object.keys(rules)

  for (let i = 0, len = validatedKeys.length; i < len; i++) {
    const key = validatedKeys[i]

    /**
     * If no default value is provided, skip
     */
    if (!rules[key].hasOwnProperty('default')) continue

    /**
     * If no value is specified or it failed validation,
     * replace the value
     */
    if (!obj[key] || failedKeys[key]) {
      obj[key] = rules[key].default
    }
  }

  return obj
}