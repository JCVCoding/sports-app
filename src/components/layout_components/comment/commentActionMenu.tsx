import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { deleteComment } from "./commentSlice";
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

const CommentActionMenu = ({ id }: { id: string }) => {
  const { league, uuid } = useAppSelector((state) => state.commentReducer);
  const dispatch = useAppDispatch();

  const deleteCommentHandler = (id: string) => {
    dispatch(deleteComment(id));

    fetch(`/api/comment/${league}/${uuid}`, {
      method: "DELETE",
      body: JSON.stringify({
        id,
      }),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <Menu placement="bottom-start">
      <MenuHandler>
        <Button variant="text" className="p-0">
          <EllipsisVerticalIcon className="h-6 w-6" />
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem className="flex gap-2">
          <PencilIcon className="h-4 w-4" />
          Edit
        </MenuItem>
        <MenuItem
          className="flex gap-2"
          onClick={() => deleteCommentHandler(id)}
        >
          <TrashIcon className="h-4 w-4" />
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CommentActionMenu;
