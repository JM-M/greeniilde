const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="min-h-[calc(100vh-4rem)] pt-14">{children}</main>;
};

export default PagesLayout;
