export {default} from 'next-auth/middleware'

export const config = {
    matcher: [
        '/expenses/list', 
        '/expenses/add', 
        '/expenses/edit/:id+'
    ]
}