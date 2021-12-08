export default function OverviewHeader({ handleSortClick }) {
  return (
    <>
      <div className="overview__header">
        <div
          className="overview__header-item"
          onClick={() => {
            handleSortClick("_id");
          }}
        >
          #
        </div>
        <div
          className="overview__header-item"
          onClick={() => {
            handleSortClick("operatingSystem");
          }}
        >
          Operating System
        </div>
        <div
          className="overview__header-item"
          onClick={() => {
            handleSortClick("keyboardLayout");
          }}
        >
          Keyboard Layout
        </div>
        <div
          className="overview__header-item"
          onClick={() => {
            handleSortClick("displaySize");
          }}
        >
          Display Size
        </div>
        <div
          className="overview__header-item"
          onClick={() => {
            handleSortClick("modelYear");
          }}
        >
          Model Year
        </div>
        <div
          className="overview__header-item"
          onClick={() => {
            handleSortClick("comment");
          }}
        >
          Comment
        </div>
        <div
          className="overview__header-item"
          onClick={() => {
            handleSortClick("availability");
          }}
        >
          Availability
        </div>
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
