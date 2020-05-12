import useSWR, { mutate } from 'swr' // remote data lib
import * as Api from './api'

export async function addComment (comment) {
  const newComment = await Api.createComment(comment)
  mutate('/comments', (comments) => [...comments, newComment])
}

export function useCommentsState () {
  const { data: comments, error } = useSWR('/comments', Api.getComments)
  return { comments, error }
}
