import React, { useState, useEffect } from "react";

/**
 * React Lifecycle 학습용 파일입니다.
 * 실 프로젝트에서 사용되지 않는 파일입니다.
 */

function UnmountTest() {
  useEffect(() => {
    console.log("Debug>>> Mount!");
    return () => {
      // return 함수 내부는 Unmount(== onDestroy)시점에 실행됨
      console.log("Debug>>> Unmount!");
    };
  }, []);

  return <div>Unmount Testing Component</div>;
}

function LifeCycle() {
  //   const [count, setCount] = useState(0);
  //   const [text, setText] = useState("");
  //
  //   /**
  //    * Mount(==onCreate) 시점에 하고 싶은 동작은 useEffect를 빈deps배열과 같이 사용
  //    */
  //   useEffect(() => {
  //     console.log("Debug>>> Mount!");
  //   }, []);

  //   /**
  //    * Update 시점에 하고 싶은 동작은 useEffect를 effect 콜백만 전달해 사용
  //    */
  //   useEffect(() => {
  //     console.log("Debug>>> Update!");
  //   });

  //   /**
  //    * deps arr의 활용예
  //    */
  //   useEffect(() => {
  //     console.log(`Debug>>> count가 ${count}로 업데이트되었습니다.`);
  //     if (count > 5) {
  //       alert("님 6번 이상 누르심 뭐함?");
  //       setCount(1);
  //     }
  //   }, [count]);
  //   useEffect(() => {
  //     console.log(`Debug>>> text가 ${text}로 업데이트되었습니다.`);
  //   }, [text]);

  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      {/* <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div> */}
      <button onClick={toggle}>ON/OFF</button>
      {/* and연산자 이용 선택적 렌더링 */}
      {isVisible && <UnmountTest />}
    </div>
  );
}

export default LifeCycle;
