/**
 * xs < 576px
 * sm ≥ 576px
 * md ≥ 768px
 * lg ≥ 992px
 * xl ≥ 1200px
 * xxl ≥ 1600px
 */
class LayoutUtils {
  static getFormItemLayout(columnLayout, columnIndex = 0, columnExpand = 1) {
    if (columnLayout === 1) {
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
          md: { span: 10 },
        },
      };
      return formItemLayout;
    } else if (columnLayout === 2) {
      const expand = columnExpand > 2 ? 2 : columnExpand;
      if (expand === 2) {
        const formItemLayout = {
          sm: 24,
          md: 24,
          lg: 24,
          xl: 22,
        };
        return formItemLayout;
      } else {
        const formItemLayout = {
          sm: 24,
          md: 12,
          lg: 12,
          xl: { span: 10, offset: columnIndex % 2 === 0 ? 0 : 2 },
        };
        return formItemLayout;
      }
    } else if (columnLayout === 3) {
      const expand = columnExpand > 3 ? 3 : columnExpand;
      if (expand === 3) {
        return {
          sm: 24,
          md: 24,
          lg: 24,
          xl: 22,
        };
      } else if (expand === 2) {
        if (columnIndex === 0) {
          return {
            sm: 24,
            md: 16,
            lg: 16,
            xl: 14,
          };
        } else {
          return {
            sm: 24,
            md: 16,
            lg: 16,
            xl: { span: 14, offset: 2 },
          };
        }
      } else {
        const formItemLayout = {
          sm: 24,
          md: 8,
          lg: 8,
          xl: { span: 6, offset: columnIndex % 3 === 0 ? 0 : 2 },
        };
        return formItemLayout;
      }
    }
  }

  static getFormItemLayoutWithoutOffset(columnLayout) {
    if (columnLayout === 1) {
      return LayoutUtils.getFormItemLayout(columnLayout);
    } else if (columnLayout === 2) {
      return { sm: 24, md: 12 };
    } else if (columnLayout === 3) {
      return { sm: 24, md: 8 };
    }
  }

  static getFormButtonLayout(columnLayout) {
    if (columnLayout === 1) {
      const formButtonLayout = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 10, offset: 7 },
        },
      };
      return formButtonLayout;
    } else {
      const formButtonLayout = {
        lg: 24,
        xl: 22,
      };
      return formButtonLayout;
    }
  }

  static getDescButtonLayout(columnLayout) {
    if (columnLayout === 1) {
      const formButtonLayout = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 10, offset: 7 },
        },
      };
      return formButtonLayout;
    } else {
      const formButtonLayout = {
        wrapperCol: {
          sm: { span: 24, offset: 0 },
          md: { span: 16, offset: 8 },
        },
      };
      return formButtonLayout;
    }
  }
}

export default LayoutUtils;
