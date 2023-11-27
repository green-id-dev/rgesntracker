export default function navBar() {

    return (
        <div>
            <div className="flex flex-row p-6 justify-center items-center">
                <img src="/logo.svg" className="w-6 h-6" alt="Logo"/>
                <h1 className="arial font-black text-xl ml-2 text-center">RGESN Tracker</h1>
            </div>
            <div className="flex bg-grey h-0.5"></div>
        </div>
    )
}