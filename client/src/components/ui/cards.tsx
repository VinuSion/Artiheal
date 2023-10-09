export const cards = () => {
    return (
        <div className="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl m-5 shadow-2xl mb-32">
            <div className="h-48 bg-gray-700 rounded-xl"></div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold">Servicio</span>
                    </div>
                </div>
                <button className='"bg-indigo-500 rounded-3xl text-primary-foreground hover:bg-indigo-600"'></button>
            </div>
        </div>
    )
}
