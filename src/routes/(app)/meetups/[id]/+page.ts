import { redirect } from "@sveltejs/kit"

export const load = (async ({ params }) => {
    throw redirect(300, `/meetups/${params.id}/info`)
})
