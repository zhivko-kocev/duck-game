import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";

type Game = {
  id: number;
  player: number[];
  board: string[][];
  state: string;
};

function App() {
  const [data, setData] = useState<Game | null>(null);
  const [level, setLevel] = useState("1");
  const dataRef = useRef<Game | null>(null);

  useEffect(() => {
    fetchData();

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    dataRef.current = data;

    if (data?.state == "won") {
      const nextLevel = String(parseInt(level) + 1);
      setLevel(nextLevel);
    }
  }, [data]);

  useEffect(() => {
    if (level == "11") {
    }
    fetchData();
  }, [level]);

  const fetchData = async () => {
    try {
      const { data: response } = await axios.get<Game>(
        "/api/game/start/" + level
      );
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };

  const move = async (dir: number[]) => {
    try {
      const { data: response } = await axios.post<Game>(`/api/game/move`, {
        direction: dir,
      });
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };

  const undo = async () => {
    try {
      const { data: response } = await axios.get<Game>(`/api/game/undo`);
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (dataRef.current?.state === "lost") {
      e.preventDefault();
      return;
    }

    if (e.code == "ArrowUp" || e.code == "ArrowDown") {
      e.preventDefault();
    }

    if (e.code === "ArrowUp") move([-1, 0]);
    if (e.code === "ArrowDown") move([1, 0]);
    if (e.code === "ArrowLeft") move([0, -1]);
    if (e.code === "ArrowRight") move([0, 1]);
  };

  const renderCell = (cell: string, isPlayer: boolean) => {
    let src = "./empty.png";
    if (cell === "#") src = "./wall.png";
    if (cell === "L") src = "./lava.png";
    if (cell === "W") src = "./water.png";
    if (cell === "G") src = "./finish.png";
    if (cell === "B") src = "./box.png";
    if (isPlayer && cell == "W") src = "./player-water.png";
    if (isPlayer && cell == "#") src = "./player-wall.png";
    if (isPlayer && cell == "L") src = "./player-lava.png";
    if (isPlayer && (cell == "." || cell == "C")) src = "./player-empty.png";

    return <img src={src} alt="" />;
  };

  const renderGrid = () => {
    if (!data) return null;

    return data.board.map((row, rowIndex) => (
      <div className="row" key={rowIndex}>
        {row.map((cell, colIndex) => {
          const isPlayer =
            data.player[0] === rowIndex && data.player[1] === colIndex;
          return (
            <div className="column" key={colIndex}>
              {renderCell(cell, isPlayer)}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <>
      <div className="main">
        <div className="nav">
          <div className="apologise">
            <div className="logo">Kocew.</div>
            <div className="text">
              Sorry for copying the game.Built it from scratch because i
              couldn't sleep from the question "How would you implemented this
              yourself from zero?". So i made it only for myself. The levels are
              boring i wasnt that creative. Maybe it has few bugs but i forgot
              all the requirements :D. It is hosted on my home ngnix server and
              the frontend and the backend are dockerized within docker compose.
              Honestly i learned so much from this experience XD.
            </div>
            <a href="https://github.com/zhivko-kocev/duck-game" target="blank_">
              Here is the link to the source code on my GitHub
            </a>
          </div>
        </div>
        <div className="game">{renderGrid()}</div>
        <div className="undo">
          <div className="btns">
            <button onClick={() => undo()}>Undo</button>
            <button onClick={() => fetchData()}>Reset</button>
          </div>
          <div className="levels">
            <button className="level1" onClick={() => setLevel("1")}>
              Level 1
            </button>
            <button className="level2" onClick={() => setLevel("2")}>
              Level 2
            </button>
            <button className="level3" onClick={() => setLevel("3")}>
              Level 3
            </button>
            <button className="level4" onClick={() => setLevel("4")}>
              Level 4
            </button>
            <button className="level5" onClick={() => setLevel("5")}>
              Level 5
            </button>
            <button className="level6" onClick={() => setLevel("6")}>
              Level 6
            </button>
            <button className="level7" onClick={() => setLevel("7")}>
              Level 7
            </button>
            <button className="level8" onClick={() => setLevel("8")}>
              Level 8
            </button>
            <button className="level9" onClick={() => setLevel("9")}>
              Level 9
            </button>
            <button className="level10" onClick={() => setLevel("10")}>
              Level 10
            </button>
          </div>
        </div>
        {data?.state === "lost" && (
          <>
            <div className="overlay"></div>
            <div className="modal">
              <p>You lost the game!</p>
              <button onClick={() => fetchData()}>Retry</button>
            </div>
          </>
        )}
        {data?.state == "won" && level == "11" && (
          <>
            <div className="overlay"></div>
            <div className="modal">
              <p>You won every level congrats!</p>
              <button onClick={() => setLevel("1")}>Start Again.</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
