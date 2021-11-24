export default function TabNavigation({user, setActiveTab, activeTab}) {
    return (
        <>
            {user.role === "user" &&  (<div className="tab-navigation">
                <button className={`tab-navigation__item ${activeTab==="overview"?"tab-navigation__item--active":""}`} onClick={() => setActiveTab("overview")}>Overview</button>
                <button className={`tab-navigation__item ${activeTab==="lends"?"tab-navigation__item--active":""}`} onClick={() => setActiveTab("lends")}>Lends</button>
            </div>)}
            {user.role === "admin" &&  (<div className="tab-navigation">
                <button className={`tab-navigation__item ${activeTab==="overview"?"tab-navigation__item--active":""}`} onClick={() => setActiveTab("overview")}>Overview</button>
                <button className={`tab-navigation__item ${activeTab==="pending"?"tab-navigation__item--active":""}`} onClick={() => setActiveTab("pending")}>Pending</button>
            </div>)}
            <style jsx>{`
                .tab-navigation__item {
                    padding: 10px;
                    border-radius: 50px;
                    border: none;
                    background-color: #eee;
                    margin: 0 10px;
                    cursor: pointer;
                }

                .tab-navigation__item--active {
                    background-color: #ccc;
                }
            `}</style>
        </>
    )
}