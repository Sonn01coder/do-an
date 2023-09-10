import { toast } from 'react-hot-toast';

export const ToastSuccess = (content) => {
  toast.success(content, {
    position: 'bottom-right'
  });
};

export const ToastError = (content) => {
  toast.error(content, {
    position: 'bottom-right'
  });
};
