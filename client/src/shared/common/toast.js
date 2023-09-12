import { toast } from 'react-hot-toast';

export const ToastSuccess = (content) => {
  toast.success(content, {
    position: 'bottom-right',
    duration: 2000
  });
};

export const ToastError = (content) => {
  toast.error(content, {
    duration:2000,
    position: 'bottom-right'
  });
};
