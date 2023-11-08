import { useState } from '#imports'

export const useFoo = () => useState('foo', () => 'foo')
