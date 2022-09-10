const InvariantError = require('../../exceptions/InvariantError');
const { NotePayloadSchema } = require('./schema');

const NotesValidator = {
  validateNotePayload: (payload) => {
    const validatationResult = NotePayloadSchema.validate(payload);
    if (validatationResult.error) throw new InvariantError(validatationResult.error.message);
  },
};

module.exports = NotesValidator;
