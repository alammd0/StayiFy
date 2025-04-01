
const LogoutModal = ({ logoutHandler, setLogoutModal } : any) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-950 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={logoutHandler}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Yes, Logout
                    </button>
                    <button
                        onClick={() => setLogoutModal(false)}
                        className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LogoutModal
