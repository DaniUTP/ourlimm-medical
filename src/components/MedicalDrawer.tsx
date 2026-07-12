import * as React from 'react';

interface MedicalDrawerContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  variant: 'sidebar' | 'floating' | 'inset';
  collapsible: 'icon' | 'offcanvas' | 'none';
  side: 'left' | 'right';
  overlay: boolean;
  openOnHover: boolean;
  isMobile: boolean;
  onMobileNavigate: () => void;
}

const MedicalDrawerContext = React.createContext<MedicalDrawerContextType | undefined>(undefined);

function useMedicalDrawer() {
  const context = React.useContext(MedicalDrawerContext);

  if (!context) {
    throw new Error('useMedicalDrawer must be used within an MedicalDrawer.Root context');
  }

  return context;
}

const Layout: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`app-drawer-layout flex w-full min-h-screen bg-surface-50 dark:bg-surface-950 ${className}`}>
      <style>{`
        .app-drawer-layout {
          min-height: 100vh;
        }
        .app-drawer-layout .app-content {
          margin-left: 0 !important;
        }
        .app-drawer-aside {
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
          position: sticky;
          top: 0;
          height: 100vh;
          z-index: 50;
        }
        .app-drawer-aside[data-collapsed="true"] {
          width: 72px !important;
        }
        .app-drawer-aside[data-collapsed="true"] .hide-on-collapsed {
          display: none !important;
        }
        .app-drawer-aside[data-collapsed="true"] .drawer-menu-btn span {
          display: none !important;
        }
        .app-drawer-aside[data-collapsed="true"] .drawer-menu-btn {
          justify-content: center !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .app-drawer-aside[data-collapsed="true"] .center-on-collapsed {
          justify-content: center !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .app-drawer-aside[data-collapsed="true"] .drawer-logo {
          justify-content: center !important;
        }
        .app-drawer-aside[data-collapsed="true"] .drawer-logo-text {
          display: none !important;
        }
        @media (max-width: 1024px) {
          .app-drawer-aside {
            position: fixed !important;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 9999;
            transform: translateX(-100%);
          }
          .app-drawer-aside[data-mobile-open="true"] {
            transform: translateX(0);
          }
        }
      `}</style>
      {children}
    </div>
  );
};

const Backdrop: React.FC<{ className?: string; onClick?: () => void }> = ({ className = '', onClick }) => {
  const context = React.useContext(MedicalDrawerContext);
  const open = context ? context.open : false;
  const isMobile = context ? context.isMobile : false;

  if (!isMobile || !open) {
    return null;
  }

  return (
    <div
      onClick={onClick || (() => context?.setOpen(false))}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.38)',
        backdropFilter: 'blur(2px)',
        zIndex: 9998,
        transition: 'opacity 0.3s ease',
      }}
      className={className}
    />
  );
};

const Root: React.FC<{
  id?: string;
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'icon' | 'offcanvas' | 'none';
  side?: 'left' | 'right';
  overlay?: boolean;
  openOnHover?: boolean;
  children: React.ReactNode;
}> = ({
  children,
  variant = 'sidebar',
  collapsible = 'icon',
  side = 'left',
  overlay = false,
  openOnHover = false,
}) => {
  const [isMobile, setIsMobile] = React.useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 1024 : false
  );
  const [open, setOpen] = React.useState(() =>
    typeof window !== 'undefined' ? window.innerWidth > 1024 : true
  );

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);

      if (mobile) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onMobileNavigate = React.useCallback(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <MedicalDrawerContext.Provider value={{ open, setOpen, variant, collapsible, side, overlay, openOnHover, isMobile, onMobileNavigate }}>
      {children}
    </MedicalDrawerContext.Provider>
  );
};

const Spacer: React.FC = () => <div className="h-4 w-full" />;

const Aside: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const { open, variant, collapsible, isMobile } = useMedicalDrawer();

  const isCollapsed = !isMobile && !open && collapsible === 'icon';
  const isOffcanvas = !open && collapsible === 'offcanvas';

  let wrapperClassName = 'w-64 bg-white dark:bg-surface-900 border-r border-surface-200/60 dark:border-surface-800/60 h-screen flex flex-col';

  if (variant === 'floating') {
    wrapperClassName = 'w-64 m-4 rounded-2xl bg-white dark:bg-surface-900 shadow-lg h-[calc(100vh-2rem)] flex flex-col';
  } else if (variant === 'inset') {
    wrapperClassName = 'w-64 bg-surface-50 dark:bg-surface-950 border-r border-surface-200/60 dark:border-surface-800/60 h-screen flex flex-col';
  }

  if (isOffcanvas) {
    wrapperClassName += ' w-0 overflow-hidden border-none';
  }

  if (isMobile) {
    return (
      <aside
        data-collapsed={false}
        data-mobile-open={open}
        className={`app-drawer-aside ${wrapperClassName} ${className}`}
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          width: '280px',
          zIndex: 9999,
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: open ? '4px 0 25px rgba(0,0,0,0.15)' : 'none',
          backgroundColor: '#ffffff',
        }}
      >
        {children}
      </aside>
    );
  }

  return (
    <aside
      data-collapsed={isCollapsed}
      data-mobile-open={open}
      className={`app-drawer-aside ${wrapperClassName} ${className}`}
      style={{
        width: isCollapsed ? '72px' : '260px',
      }}
    >
      {children}
    </aside>
  );
};

const Panel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`flex flex-col h-full w-full overflow-hidden ${className}`}>{children}</div>;
};

const Header: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`pt-3 pb-1 px-4 flex items-center gap-3 shrink-0 ${className}`}>{children}</div>;
};

const Content: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-4 custom-scrollbar ${className}`}>{children}</div>;
};

const Group: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`flex flex-col gap-1 ${className}`}>{children}</div>;
};

const GroupLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`text-[10px] font-bold uppercase tracking-wider text-surface-400 dark:text-surface-500 px-3 py-1 hide-on-collapsed ${className}`}>{children}</div>;
};

const GroupContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`flex flex-col gap-0.5 ${className}`}>{children}</div>;
};

const Menu: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <nav className={`flex flex-col gap-1 ${className}`}>{children}</nav>;
};

const MenuItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
}> = ({ children, className = '', collapsible, defaultOpen }) => {
  const [open, setOpen] = React.useState(defaultOpen || false);

  return (
    <div className={`relative flex flex-col ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const element = child as React.ReactElement<any>;

          if (element.type === MenuSub) {
            return open ? element : null;
          }

          if (collapsible && element.type === MenuButton) {
            return React.cloneElement(element, {
              onClick: (e: React.MouseEvent) => {
                setOpen(!open);
                if (element.props.onClick) {
                  element.props.onClick(e);
                }
              },
            });
          }
        }

        return child;
      })}
    </div>
  );
};

const MenuButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}> = ({ children, className = '', isActive = false, onClick, style }) => {
  const { open, isMobile, onMobileNavigate } = useMedicalDrawer();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }

    onMobileNavigate();
  };

  return (
    <button
      onClick={handleClick}
      style={{ border: 'none', outline: 'none', background: 'transparent', ...style }}
      className={`drawer-menu-btn flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 text-left relative overflow-hidden group/btn cursor-pointer border-0
        ${isActive
          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 font-semibold shadow-xs'
          : 'text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800'
        }
        ${!isMobile && !open ? 'center-on-collapsed' : ''}
        ${className}`}
    >
      {children}
    </button>
  );
};

const MenuBadge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400 hide-on-collapsed ${className}`}>{children}</span>;
};

const MenuSub: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`pl-8 pr-2 py-1 flex flex-col gap-1 border-l border-surface-100/20 dark:border-surface-800/20 ml-4 mt-0.5 hide-on-collapsed ${className}`}>{children}</div>;
};

const MenuSubItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`relative ${className}`}>{children}</div>;
};

const MenuSubButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}> = ({ children, className = '', isActive = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ border: 'none', outline: 'none', background: 'transparent' }}
      className={`w-full text-left px-2 py-1.5 text-xs rounded-md transition-all duration-150 cursor-pointer border-0
        ${isActive
          ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/40 dark:bg-blue-950/20'
          : 'text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-surface-50/50 dark:hover:bg-surface-800/50'
        } ${className}`}
    >
      {children}
    </button>
  );
};

const MenuAction: React.FC<{ children: React.ReactNode; className?: string; showOnHover?: boolean }> = ({ children, className = '', showOnHover = false }) => {
  return <div className={`absolute right-2 top-1/2 -translate-y-1/2 flex items-center ${showOnHover ? 'opacity-0 group-hover/btn:opacity-100 transition-opacity' : ''} ${className}`}>{children}</div>;
};

const Footer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`p-4 mt-auto bg-white dark:bg-surface-900 shrink-0 ${className}`}>{children}</div>;
};

const Rail: React.FC = () => {
  const { isMobile } = useMedicalDrawer();

  if (isMobile) {
    return null;
  }

  return <div className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500/50 transition-colors" />;
};

const Main: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`flex-1 flex flex-col min-h-screen overflow-x-hidden ${className}`}>{children}</div>;
};

const Trigger: React.FC<{
  as?: React.ComponentType<any> | string;
  severity?: string;
  variant?: string;
  size?: string;
  iconOnly?: boolean;
  children?: React.ReactNode;
  className?: string;
}> = ({
  as: Component = 'button',
  children,
  className = '',
  ...props
}) => {
  const { open, setOpen } = useMedicalDrawer();

  const handleClick = () => {
    setOpen(!open);
  };

  const customClass = `app-drawer-trigger flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-md p-1.5 ${className}`;

  if (typeof Component === 'string') {
    return (
      <button
        onClick={handleClick}
        className={customClass}
        style={{ border: 'none', outline: 'none', background: 'transparent' }}
        {...props}
      >
        {children || <i className="pi pi-bars text-gray-600 dark:text-gray-300" />}
      </button>
    );
  }

  const RenderedComponent = Component as any;

  return (
    <RenderedComponent onClick={handleClick} className={customClass} {...props}>
      {children || <i className="pi pi-bars text-gray-600 dark:text-gray-300" />}
    </RenderedComponent>
  );
};

export const MedicalDrawer = {
  Layout,
  Backdrop,
  Root,
  Spacer,
  Aside,
  Panel,
  Header,
  Content,
  Group,
  GroupLabel,
  GroupContent,
  Menu,
  MenuItem,
  MenuButton,
  MenuBadge,
  MenuSub,
  MenuSubItem,
  MenuSubButton,
  MenuAction,
  Footer,
  Rail,
  Main,
  Trigger,
};
