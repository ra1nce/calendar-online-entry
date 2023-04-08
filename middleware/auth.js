export default function ({ query, redirect }) {
    if (query.key !== 'secret_key') {
        return redirect('/')
    }
}
  