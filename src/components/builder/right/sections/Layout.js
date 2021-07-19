import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import React, { memo, useState } from "react";
import * as styles from "./Layout.module.css";
import { move, reorder } from "utils";
import { useDispatch, useSelector } from "contexts/resume/resume.provider";
import Button from "components/shared/Button";
import Heading from "components/shared/Heading";

const Layout = ({ id }) => {
  const { t } = useTranslation();
  const [resetLayoutText, setResetLayoutText] = useState(
    t("builder.layout.reset"),
  );

  const template = useSelector("metadata.template");
  const blocks = useSelector(`metadata.layout.${template}`, [[]]);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(blocks[sInd], source.index, destination.index);
      const newState = [...blocks];
      newState[sInd] = items;
      dispatch({
        type: "on_input",
        payload: {
          path: `metadata.layout.${template}`,
          value: newState,
        },
      });
    } else {
      const newResult = move(blocks[sInd], blocks[dInd], source, destination);
      const newState = [...blocks];
      newState[sInd] = newResult[sInd];
      newState[dInd] = newResult[dInd];
      dispatch({
        type: "on_input",
        payload: {
          path: `metadata.layout.${template}`,
          value: newState,
        },
      });
    }
  };

  const handleResetLayout = () => {
    if (resetLayoutText === t("builder.layout.reset")) {
      setResetLayoutText(t("shared.buttons.confirmation"));
      return;
    }

    dispatch({ type: "reset_layout" });
    setResetLayoutText(t("builder.layout.reset"));
  };

  return (
    <section>
      <Heading id={id} />

      <p className="leading-loose">
        {t("builder.layout.text", { count: blocks.length })}
      </p>

      <div className={`grid gap-2 grid-cols-${blocks.length}`}>
        <DragDropContext onDragEnd={onDragEnd}>
          {blocks.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(dropProvided) => (
                <div
                  ref={dropProvided.innerRef}
                  className={styles.droppable}
                  {...dropProvided.droppableProps}
                >
                  <div className="grid gap-3">
                    <span className="uppercase font-semibold text-xs">
                      {t("builder.layout.block")} {ind + 1}
                    </span>
                    {el.map((item, index) => (
                      <Draggable key={item} index={index} draggableId={item}>
                        {(dragProvided) => (
                          <div
                            ref={dragProvided.innerRef}
                            className={styles.draggable}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                          >
                            {t(`builder.sections.${item}`)}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  {dropProvided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>

      <div className="flex">
        <Button onClick={handleResetLayout}>{resetLayoutText}</Button>
      </div>
    </section>
  );
};

export default memo(Layout);