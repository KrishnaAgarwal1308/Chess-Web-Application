export const Button = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
    return (
        <button onClick={onClick} className='bg-green-600 mt-4 rounded-md px-20 py-6 text-2xl font-semibold hover:bg-green-700'>{children}</button>
    )
}