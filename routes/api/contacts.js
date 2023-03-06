const express = require('express');

const contactsOperation = require("../../models");

const router = express.Router();

router.get('/', async (req, res, next) => {
try {
  const contacts = await contactsOperation.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts
    }
  })
} catch (error) {
  console.log(error.message)
  res.status(500).json({
    status: "error",
    code: 500,
    message: "Server error"
  })
}
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
