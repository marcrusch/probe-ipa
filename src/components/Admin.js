import { useState } from "react";
import AdminDeviceOverview from "./AdminDeviceOverview";
import TabNavigation from "./TabNavigation";

export default function Admin({user}) {
    const [activeTab, setActiveTab] = useState("overview");
    return (
        <>
            <div className="admin">
                <div className="main-content">
                    <div className="tab-navigation-wrapper">
                        <TabNavigation user={user} setActiveTab={setActiveTab} activeTab={activeTab}/>
                    </div>
                    {activeTab === "overview" && (
                        <>
                            <AdminDeviceOverview/>
                        </>
                    )}
                    {activeTab === "pending" && (
                        <>
                        </>
                    )}
                </div>
            </div>
            <style jsx>{`
                .tab-navigation-wrapper {
                    text-align: center;
                }

                .main-content {
                    width: 100vw;
                    padding: 25px 5vw;
                }
            `}</style>
        </>
    )
}