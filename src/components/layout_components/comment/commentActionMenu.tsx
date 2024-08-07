import { useDeleteCommentMutation } from "./commentSlice";
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
}: {
  id: string;
  editDispatch: DispatchWithoutAction;
  parentId?: string;
}) => {
  const [deleteComment] = useDeleteCommentMutation();
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
          onClick={() => deleteComment({ league, uuid, id, parentId })}
        >
          <TrashIcon className="h-4 w-4" />
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CommentActionMenu;
