const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid')

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: true,
      maxlength: 18,
    },

    lastname: {
      type: String,
      trim: true,
      required: true,
      maxlength: 18,
    },

    role: {
      type: Number,
      default: 0,
    },
    phonenumber: {
      type: Number,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    favourit: {
      type: Array,
      default: [],
    },
    image: {
      type: String,
      default:
        'https://www.kindpng.com/picc/m/9-93879_computer-icons-user-image-person-silhouette-user-silhouettes.png',
    },
    salt: String,
  },
  { timestamps: true }
)

// virtual field
userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = uuidv1.v1()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

  encryptPassword: function (password) {
    if (!password) return ''
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    } catch (err) {
      return ''
    }
  },
}

module.exports = mongoose.model('User', userSchema)
