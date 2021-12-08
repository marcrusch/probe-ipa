import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OverviewHeader({ handleSortClick, currentSort }) {
  const headerItems = [
    {
      key: "_id",
      name: "#",
    },
    {
      key: "operatingSystem",
      name: "Operating System",
    },
    {
      key: "keyboardLayout",
      name: "Keyboard Layout",
    },
    {
      key: "displaySize",
      name: "Display Size",
    },
    {
      key: "modelYear",
      name: "Model Year",
    },
    {
      key: "comment",
      name: "Comment",
    },
    {
      key: "availability",
      name: "Availability",
    },
  ];
  return (
    <>
      <div className="overview__header">
        {headerItems.map((item) => {
          return (
            <div
              className="overview__header-item"
              onClick={() => {
                handleSortClick(item.key);
              }}
              key={`header-item_${item.key}`}
            >
              {item.name}
              {currentSort.property === item.key && (
                <FontAwesomeIcon
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translate(0, -50%)",
                  }}
                  icon={currentSort.ascending ? faCaretUp : faCaretDown}
                />
              )}
            </div>
          );
        })}
        <div className="overview__header-item"></div>
      </div>
      <style jsx>{`
        .overview__header {
          background-color: #222;
          width: 100%;
          display: flex;
        }

        .overview__header-item {
          flex: 1;
          padding: 20px;
          color: #fff;
          text-align: center;
          cursor: pointer;
          position: relative;
        }

        @media screen and (max-width: 1024px) {
          .overview__header {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
