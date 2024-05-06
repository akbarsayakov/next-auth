'use server'

import { db } from '@/lib/db'
import { RegisterSchema } from '@/schemas'
import * as z from 'zod'
import brcypt from 'bcrypt'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, name } = validateFields.data

  const existingEmail = await db.user.findUnique({ where: { email } })

  if (existingEmail) {
    return { error: 'Email already exists' }
  }

  const hashedPassword = await brcypt.hash(password, 10)

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return { success: 'User created!' }
}
