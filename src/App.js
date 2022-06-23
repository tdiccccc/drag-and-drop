import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './App.css';

const items = [
  {
    id: "item-0",
    content: "item 0",
  },
  {
    id: "item-1",
    content: "item 1",
  },
  {
    id: "item-2",
    content: "item 2",
  },
  {
    id: "item-3",
    content: "item 3",
  },
  {
    id: "item-4",
    content: "item 4",
  },
];

const grid = 8;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ?/*? = 三項演算子*/ "lightblue"/*trueであれば*/ : "lightgrey"/*falseであれば*/,
  width: 250,
  padding: grid,
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",/*文字のdrag and dropをできなくする */
  padding: grid * 2,
  margin: `0 0 ${grid} 0`,
  background: isDragging ? "lightgreen" : "grey",

  ...draggableStyle,  /*スプレッド構文*/
});

const reorder = (list, startIndex, endIndex) => {
  const removed = list.splice(startIndex, 1); //ドラッグ開始要素の削除
  console.log(removed);
  list.splice(endIndex, 0, removed[0]); //ドロップした箇所に挿入
};
// const reorder = (list, startIndex, endIndex) => {
//   const removed = list.splice(startIndex, 1); /*dragを開始した要素を1個だけ削除する -> removeに入れてあげる*/
//   list.splice(endIndex, 0, removed[0]);/*splice 削除機能と3つ引数をとると追加する関数　配列を入れ替える */
// };

function App() {

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    reorder(items, result.source.index, result.destination.index);
  };

  return <div>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, sanpshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(sanpshot.isDraggingOver/*dragしている間cssを変える*/)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, sanpshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      sanpshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  </div>;
}

export default App;
