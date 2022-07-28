import DiaryItem from "./DiaryItem";

function DiaryList({ diaryList, onRemove, onEdit }) {
  console.log(diaryList);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          // jsx 요소 반환으로 인한 소괄호 for map 메소드
          <DiaryItem onRemove={onRemove} onEdit={onEdit} key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
