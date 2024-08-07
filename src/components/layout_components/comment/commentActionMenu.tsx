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
import { DispatchWithoutAction } from "react";

const CommentActionMenu = ({
  id,
  editDispatch,
  parentId,
  isReply,
}: {
  id: string;
  editDispatch: DispatchWithoutAction;
  parentId?: string;
  isReply: boolean;
}) => {
  const [deleteComment] = useDeleteCommentMutation();
  const [deleteReply] = useDeleteReplyMutation();
  const { league, uuid } = useAppSelector((state) => state.commentReducer);

  return (
    <Menu placement="bottom-start">
      <MenuHandler>
        <Button variant="text" className="p-0">
          <EllipsisVerticalIcon className="h-6 w-6" />
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem
          className="flex gap-2"
          onClick={() => editDispatch({ type: "EDITING" })}
        >
          <PencilIcon className="h-4 w-4" />
          Edit
        </MenuItem>
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
