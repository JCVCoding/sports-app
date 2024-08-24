import {
  useDeleteCommentMutation,
  useDeleteReplyMutation,
} from "./commentSlice";
import { useAppSelector } from "@/lib/hooks";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { DispatchWithoutAction, useState } from "react";

const CommentActionMenu = ({
  id,
  editDispatch,
  parentId,
  isReply,
}: {
  id: string | null | undefined;
  editDispatch: DispatchWithoutAction;
  parentId?: string | null | undefined;
  isReply: boolean;
}) => {
  const [deleteComment] = useDeleteCommentMutation();
  const [deleteReply] = useDeleteReplyMutation();
  const [openMenu, setOpenMenu] = useState(false);
  const { league, uuid } = useAppSelector((state) => state.commentReducer);

  return (
    <Menu placement="bottom-start" open={openMenu} handler={setOpenMenu}>
      <MenuHandler>
        {/* @ts-ignore */}
        <Button
          variant="text"
          className="p-0"
          aria-label={
            openMenu ? "close comment action menu" : "open comment action menu"
          }
        >
          <EllipsisVerticalIcon className="h-6 w-6" />
        </Button>
      </MenuHandler>
      {/* @ts-ignore */}
      <MenuList>
        {/* @ts-ignore */}
        <MenuItem
          className="flex gap-2"
          /* @ts-ignore */
          onClick={() => editDispatch({ type: "EDITING" })}
        >
          <PencilIcon className="h-4 w-4" />
          Edit
        </MenuItem>
        {/* @ts-ignore */}
        <MenuItem
          className="flex gap-2"
          onClick={() =>
            !isReply
              ? deleteComment({ league, uuid, id, action: "delete_comment" })
              : deleteReply({
                  league,
                  uuid,
                  id,
                  parentId,
                  action: "delete_reply",
                })
          }
        >
          <TrashIcon className="h-4 w-4" />
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CommentActionMenu;
