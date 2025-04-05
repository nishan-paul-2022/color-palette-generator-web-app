'use client';

import { cn, withAntStyle } from '@/lib/utils/style-utils';
import { CheckCircleOutlined, InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Divider, Space, Table, Tooltip, Typography } from 'antd';
import { LucideHeart, LucideMoon, LucideSun } from 'lucide-react';
import { useTheme } from 'next-themes';
/**
 * A demo component showing how to use Ant Design components alongside
 * Tailwind CSS and Lucide icons in your application.
 */
export function AntDesignDemo() {
  const { Title, Paragraph, Text } = Typography;
  const { theme, setTheme } = useTheme();
  
  // Sample data for table
  const dataSource = [
    {
      key: '1',
      name: 'Ant Design',
      type: 'UI Library',
      description: 'Enterprise-class UI designed for web applications',
    },
    {
      key: '2',
      name: 'Tailwind CSS',
      type: 'CSS Framework',
      description: 'A utility-first CSS framework',
    },
    {
      key: '3',
      name: 'Lucide',
      type: 'Icon Library',
      description: 'Beautiful & consistent icons',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];
  
  return (
    <div className="p-4 space-y-6">
      <Card className={cn("shadow-elevation-md", "border-t-4 border-t-blue-500")}>
        <div className="flex justify-between items-center">
          <Title level={3}>Ant Design with Tailwind CSS</Title>
          
          <Tooltip title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <Button
              icon={theme === 'dark' ? <LucideSun size={16} /> : <LucideMoon size={16} />}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              shape="circle"
            />
          </Tooltip>
        </div>
        
        <Paragraph>
          This component demonstrates how to use Ant Design components alongside Tailwind CSS 
          and Lucide icons in your Next.js 15 + React 19 application.
        </Paragraph>
        
        <Divider />
        
        <Space direction="vertical" size="middle" className="w-full">
          {/* Ant Design components with Tailwind utilities */}
          <div className="flex flex-wrap gap-2">
            <Button type="primary" icon={<SearchOutlined />} className={cn("hover:shadow-lg transition-shadow")}>
              Search
            </Button>
            <Button type="default">Default Button</Button>
            <Button type="dashed">Dashed Button</Button>
            <Button 
              type="primary" 
              danger
              className={cn('rounded-full')}
            >
              Delete
            </Button>
          </div>
          
          {/* Using withAntStyle utility */}
          <DatePicker {...withAntStyle({ width: '100%' }, 'rounded-md hover:shadow-md transition-all')} />
          
          {/* Mixed Ant Design and Tailwind */}
          <div className="flex items-center gap-3 p-3 rounded-md bg-slate-100 dark:bg-slate-800">
            <CheckCircleOutlined className="text-green-500 text-xl" />
            <span className="text-sm">Ant Design Icons work seamlessly with Tailwind classes</span>
          </div>
          
          {/* Using Lucide icons alongside Ant Design */}
          <div className="flex items-center gap-3 p-3 rounded-md bg-slate-100 dark:bg-slate-800">
            <LucideHeart className="text-red-500" />
            <span className="text-sm">Lucide icons work alongside Ant Design</span>
          </div>
          
          {/* Table example */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <InfoCircleOutlined className="text-blue-500" />
              <Text type="secondary">Sample Table Component</Text>
            </div>
            <Table 
              dataSource={dataSource} 
              columns={columns} 
              size="small"
              className="rounded overflow-hidden"
              pagination={false}
            />
          </div>
        </Space>
      </Card>
    </div>
  );
} 