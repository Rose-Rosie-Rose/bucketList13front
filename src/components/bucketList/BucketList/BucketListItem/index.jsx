import {
  BucketBox,
  BucketBoxHeader,
  DeleteButton,
  ContentContainer,
  ImageBox,
  ContentBox,
  Content,
  checkBoxStyle,
} from "./styled";
import Checkbox from "../../../shared/CheckBox";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { completeBucketItem } from "../../../../api/bucketItems";

const BucketListItem = (props) => {
  const { item, imageUrl, onDelete } = props;

  // 완료 버튼 상태관리
  const [isCompleted, setIsCompleted] = useState(item.finish_check);

  const queryClient = useQueryClient();

  // 완료 토글 버튼 뮤테이션
  const updateCompletedMutation = useMutation(
    (newStatus) =>
      completeBucketItem(item.id, { ...item, finish_check: newStatus }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("bucketListItems");
      },
    }
  );

  // 삭제 버튼
  const handleClose = () => {
    onDelete(item.id);
  };

  // 완료 버튼
  const handleCheck = () => {
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    updateCompletedMutation.mutate(newStatus);
  };

  return (
    <BucketBox>
      <BucketBoxHeader>
        <DeleteButton onClick={handleClose} />
      </BucketBoxHeader>
      <ContentContainer>
        <ImageBox $imageUrl={imageUrl} />
        <ContentBox>
          <Checkbox
            style={checkBoxStyle}
            checked={isCompleted}
            onClick={handleCheck}
          />
          <Content>{item.content}</Content>
        </ContentBox>
      </ContentContainer>
    </BucketBox>
  );
};

export default BucketListItem;
