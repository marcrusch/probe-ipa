export default function ColorIndex() {
  const colors = [
    {
      description: "Always available",
      color: "#00ff00",
    },
    {
      description: "Currently unavailable",
      color: "#ff0000",
    },
    {
      description: "Currently available",
      color: "#ffa500",
    },
  ];
  return (
    <>
      <div className="color-index">
        {colors.map((item) => {
          return (
            <div
              className="color-index__item"
              key={`color-index_item_${item.color}`}
            >
              <div
                className="color-index__color"
                style={{ backgroundColor: item.color }}
              />
              <p className="color-index__description">{item.description}</p>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .color-index__color {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }

        .color-index__description {
          display: inline-block;
          margin-left: 10px;
        }

        .color-index {
          display: flex;
          width: 600px;
          float: right;
          margin-top: 100px;
        }
        .color-index__item {
          flex: 1;
        }
      `}</style>
    </>
  );
}
