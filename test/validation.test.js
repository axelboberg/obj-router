const { validate, ensure } = require('../lib/validation')
const rules = {
  'name': { required: true, type: 'string', default: 'John' },
  'interest': { required: false, default: 'ice skating', allowed: ['dancing', 'ice skating', 'skateboarding'] }
}

test('validate an object (pass)', () => {
  expect(validate({name: 'John', interest: 'skateboarding'}, rules)).toEqual({})
})

test('validate an object (fail)', () => {
  expect(validate({name: 1, interest: 'soccer'}, rules)).not.toEqual({})
})

test('ensure a failing object', () => {
  expect(ensure({interest: 'football'}, rules)).toEqual({name: 'John', interest: 'ice skating'})
})