"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  Search, Zap, Shield, Target, Brain, Activity, Clock, 
  CheckCircle, AlertCircle, ArrowRight, Download, Copy, 
  ExternalLink, Play, Pause, RefreshCw, Eye, EyeOff,
  Terminal, Code, Database, Globe, Cpu, Settings,
  TrendingUp, Award, Users, Layers, Monitor, Network,
  FileText
} from 'lucide-react';

interface ApiEndpoint {
  method: string;
  url: string;
  status: number;
  size: number;
  timestamp?: string;
  responseTime?: number;
  security?: 'secure' | 'warning' | 'critical';
  headers?: Record<string, string>;
  parameters?: string[];
  description?: string;
}

interface CrawlResult {
  endpoints: ApiEndpoint[];
  postmanCollection: any;
  crawlId: string;
  metadata?: {
    totalRequests: number;
    uniqueEndpoints: number;
    crawlDuration: number;
    securityScore: number;
    coverage: number;
    domainAnalysis: {
      subdomains: string[];
      technologies: string[];
      certificates: string[];
    };
    performanceMetrics: {
      avgResponseTime: number;
      slowestEndpoint: string;
      fastestEndpoint: string;
      errorRate: number;
    };
  };
}

interface EnhancedDashboardProps {
  className?: string;
  onSubmit?: (url: string) => Promise<void>;
  isLoading?: boolean;
  progress?: number;
  result?: CrawlResult | null;
  logs?: string[];
  error?: string | null;
}

export default function EnhancedDashboard({ 
  className = "",
  onSubmit,
  isLoading: externalLoading = false,
  progress: externalProgress = 0,
  result: externalResult = null,
  logs: externalLogs = [],
  error: externalError = null
}: EnhancedDashboardProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalProgress, setInternalProgress] = useState(0);
  const [internalResult, setInternalResult] = useState<CrawlResult | null>(null);
  const [internalLogs, setInternalLogs] = useState<string[]>([]);
  const [internalError, setInternalError] = useState<string | null>(null);
  
  const [url, setUrl] = useState('https://api.github.com');
  const [activeTab, setActiveTab] = useState<'overview' | 'endpoints' | 'security' | 'performance' | 'export'>('overview');
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [showLogs, setShowLogs] = useState(true);
  const [isRealTime, setIsRealTime] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterMethod, setFilterMethod] = useState<string>('ALL');
  const [filterSecurity, setFilterSecurity] = useState<string>('ALL');
  const logsRef = useRef<HTMLDivElement>(null);

  // Use external props if provided, otherwise use internal state
  const isLoading = onSubmit ? externalLoading : internalLoading;
  const progress = onSubmit ? externalProgress : internalProgress;
  const result = onSubmit ? externalResult : internalResult;
  const logs = onSubmit ? externalLogs : internalLogs;
  const error = onSubmit ? externalError : internalError;

  // Auto-scroll logs
  useEffect(() => {
    if (logsRef.current && isRealTime) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [logs, isRealTime]);

  // Enhanced simulation for demo purposes
  const simulateEnhancedCrawl = async () => {
    setInternalLoading(true);
    setInternalProgress(0);
    setInternalResult(null);
    setInternalLogs([]);
    setInternalError(null);
    setSelectedEndpoint(null);

    const phases = [
      { name: 'Initializing Neural Network', duration: 1000, progress: 10 },
      { name: 'Establishing Quantum Encryption', duration: 1200, progress: 20 },
      { name: 'Deploying Stealth Algorithms', duration: 800, progress: 30 },
      { name: 'Scanning Network Architecture', duration: 1500, progress: 50 },
      { name: 'AI-Powered Endpoint Discovery', duration: 2500, progress: 75 },
      { name: 'Advanced Security Analysis', duration: 1000, progress: 90 },
      { name: 'Generating Intelligence Report', duration: 800, progress: 100 }
    ];

    for (let i = 0; i < phases.length; i++) {
      const phase = phases[i];
      setInternalLogs(prev => [...prev, `🚀 ${phase.name}...`]);
      
      await new Promise(resolve => setTimeout(resolve, phase.duration));
      setInternalProgress(phase.progress);
      
      // Add dynamic logs during discovery phase
      if (i === 4) {
        const discoveryLogs = [
          '🔍 Scanning JavaScript bundles...',
          '📡 Intercepting network requests...',
          '🔐 Analyzing authentication flows...',
          '⚡ Found hidden admin endpoints...',
          '🎯 Mapping API versioning patterns...',
          '🛡️ Detecting security vulnerabilities...'
        ];
        
        for (const log of discoveryLogs) {
          await new Promise(resolve => setTimeout(resolve, 400));
          setInternalLogs(prev => [...prev, log]);
        }
      }
      
      setInternalLogs(prev => [...prev, `✅ ${phase.name} completed`]);
    }

    // Generate enhanced mock results
    const mockEndpoints: ApiEndpoint[] = [
      { 
        method: 'GET', 
        url: '/api/v1/users', 
        status: 200, 
        size: 2048, 
        responseTime: 145, 
        security: 'secure',
        timestamp: new Date().toISOString(),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer' },
        parameters: ['page', 'limit', 'sort'],
        description: 'User management endpoint with pagination'
      },
      { 
        method: 'POST', 
        url: '/api/v1/auth/login', 
        status: 200, 
        size: 512, 
        responseTime: 234, 
        security: 'warning',
        timestamp: new Date().toISOString(),
        headers: { 'Content-Type': 'application/json' },
        parameters: ['username', 'password'],
        description: 'Authentication endpoint with rate limiting'
      },
      { 
        method: 'GET', 
        url: '/api/v2/repos', 
        status: 200, 
        size: 4096, 
        responseTime: 89, 
        security: 'secure',
        timestamp: new Date().toISOString(),
        headers: { 'Content-Type': 'application/json', 'API-Version': 'v2' },
        parameters: ['owner', 'type', 'visibility'],
        description: 'Repository listing with advanced filtering'
      },
      { 
        method: 'PUT', 
        url: '/api/admin/settings', 
        status: 403, 
        size: 256, 
        responseTime: 67, 
        security: 'critical',
        timestamp: new Date().toISOString(),
        headers: { 'Content-Type': 'application/json', 'Admin-Key': 'required' },
        parameters: ['config', 'value'],
        description: 'Admin configuration endpoint - restricted access'
      },
      { 
        method: 'DELETE', 
        url: '/api/v1/data/purge', 
        status: 401, 
        size: 128, 
        responseTime: 456, 
        security: 'critical',
        timestamp: new Date().toISOString(),
        headers: { 'Content-Type': 'application/json' },
        parameters: ['confirm', 'token'],
        description: 'Data purge endpoint - requires authentication'
      },
      { 
        method: 'GET', 
        url: '/api/internal/metrics', 
        status: 200, 
        size: 8192, 
        responseTime: 1023, 
        security: 'warning',
        timestamp: new Date().toISOString(),
        headers: { 'Content-Type': 'application/json', 'Internal-Access': 'true' },
        parameters: ['timerange', 'metric_type'],
        description: 'Internal metrics - potential information disclosure'
      },
      { 
        method: 'POST', 
        url: '/api/v1/webhooks', 
        status: 201, 
        size: 1024, 
        responseTime: 178, 
        security: 'secure',
        timestamp: new Date().toISOString(),
        headers: { 'Content-Type': 'application/json', 'Webhook-Secret': 'verified' },
        parameters: ['url', 'events', 'secret'],
        description: 'Webhook registration with event filtering'
      }
    ];

    const mockResult: CrawlResult = {
      endpoints: mockEndpoints,
      crawlId: 'crawl_' + Date.now(),
      postmanCollection: { info: { name: 'Advanced API Discovery - ' + url } },
      metadata: {
        totalRequests: 147,
        uniqueEndpoints: mockEndpoints.length,
        crawlDuration: 12.3,
        securityScore: 73,
        coverage: 96,
        domainAnalysis: {
          subdomains: ['api.example.com', 'admin.example.com', 'internal.example.com'],
          technologies: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker'],
          certificates: ['Let\'s Encrypt', 'Wildcard SSL', 'Extended Validation']
        },
        performanceMetrics: {
          avgResponseTime: 245,
          slowestEndpoint: '/api/internal/metrics',
          fastestEndpoint: '/api/admin/settings',
          errorRate: 14.3
        }
      }
    };

    setInternalResult(mockResult);
    setInternalLoading(false);
    setInternalLogs(prev => [...prev, `🎉 Advanced discovery complete! Found ${mockEndpoints.length} endpoints with ${mockResult.metadata?.securityScore || 0}% security score`]);
  };

  const handleCrawl = async () => {
    if (onSubmit) {
      await onSubmit(url);
    } else {
      await simulateEnhancedCrawl();
    }
  };

  const getSecurityColor = (security?: string) => {
    switch (security) {
      case 'secure': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getSecurityBg = (security?: string) => {
    switch (security) {
      case 'secure': return 'bg-green-400/10 border-green-400/30';
      case 'warning': return 'bg-yellow-400/10 border-yellow-400/30';
      case 'critical': return 'bg-red-400/10 border-red-400/30';
      default: return 'bg-gray-400/10 border-gray-400/30';
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-400';
    if (status >= 300 && status < 400) return 'text-blue-400';
    if (status >= 400 && status < 500) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-900/50 text-green-300 border-green-500/30';
      case 'POST': return 'bg-blue-900/50 text-blue-300 border-blue-500/30';
      case 'PUT': return 'bg-yellow-900/50 text-yellow-300 border-yellow-500/30';
      case 'DELETE': return 'bg-red-900/50 text-red-300 border-red-500/30';
      case 'PATCH': return 'bg-purple-900/50 text-purple-300 border-purple-500/30';
      default: return 'bg-gray-900/50 text-gray-300 border-gray-500/30';
    }
  };

  const filteredEndpoints = result?.endpoints.filter(endpoint => {
    const methodMatch = filterMethod === 'ALL' || endpoint.method === filterMethod;
    const securityMatch = filterSecurity === 'ALL' || endpoint.security === filterSecurity;
    return methodMatch && securityMatch;
  }) || [];

  const uniqueMethods = Array.from(new Set(result?.endpoints.map(ep => ep.method) || []));

  return (
    <div className={`bg-black min-h-screen text-white ${className}`}>
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-7 h-7 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Ziro <span className="text-yellow-400">Enterprise</span>
                </h1>
                <p className="text-sm text-gray-400">Next-Generation API Discovery Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Neural Engine: Online</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>Pro License</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content - Takes 3 columns */}
          <div className="xl:col-span-3 space-y-8">
            {/* Enhanced Control Panel */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                    <Target className="w-6 h-6 text-yellow-400" />
                    <span>Target Configuration</span>
                  </h2>
                  <p className="text-gray-400 mt-1">Configure your advanced API discovery mission</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-colors"
                    title="Toggle View Mode"
                  >
                    <Layers className="w-5 h-5 text-gray-300" />
                  </button>
                  <button 
                    onClick={() => setShowLogs(!showLogs)}
                    className={`p-3 rounded-xl transition-all duration-300 ${showLogs ? 'bg-yellow-400 text-black shadow-lg' : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'}`}
                    title="Toggle Console"
                  >
                    <Terminal className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setIsRealTime(!isRealTime)}
                    className={`p-3 rounded-xl transition-all duration-300 ${isRealTime ? 'bg-green-400 text-black shadow-lg' : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'}`}
                    title="Toggle Real-time Updates"
                  >
                    {isRealTime ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter target URL (e.g., https://api.example.com)"
                    className="w-full pl-14 pr-6 py-5 bg-black/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:border-yellow-400/50 focus:outline-none transition-all duration-300 text-lg backdrop-blur-sm"
                    disabled={isLoading}
                  />
                  <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Shield className="w-4 h-4" />
                      <span>Stealth Mode</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleCrawl}
                    disabled={isLoading || !url}
                    className={`flex-1 py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-500 ${
                      isLoading 
                        ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-400/25 active:scale-[0.98]'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-3">
                        <RefreshCw className="w-6 h-6 animate-spin" />
                        <span>Neural Analysis in Progress...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3">
                        <Zap className="w-6 h-6" />
                        <span>Launch Advanced Discovery</span>
                      </div>
                    )}
                  </button>

                  {result && (
                    <button className="px-8 py-5 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-2xl transition-all duration-300 group">
                      <Download className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>
                  )}
                </div>

                {/* Enhanced Progress Bar */}
                {isLoading && (
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg text-gray-300">
                      <span className="font-semibold">Discovery Progress</span>
                      <span className="text-yellow-400 font-bold">{Math.round(progress)}%</span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-800/50 rounded-full h-4 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 h-4 rounded-full transition-all duration-1000 ease-out relative"
                          style={{ width: `${progress}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-full shadow-inner"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Results Panel */}
            {result && (
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-3xl overflow-hidden backdrop-blur-sm">
                {/* Advanced Tabs */}
                <div className="border-b border-gray-800/50 bg-black/20">
                  <div className="flex overflow-x-auto">
                    {[
                      { id: 'overview', label: 'Intelligence Overview', icon: Activity },
                      { id: 'endpoints', label: 'Discovered Endpoints', icon: Globe },
                      { id: 'security', label: 'Security Analysis', icon: Shield },
                      { id: 'performance', label: 'Performance Metrics', icon: TrendingUp },
                      { id: 'export', label: 'Export & Integration', icon: Download }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`flex-shrink-0 px-8 py-6 text-sm font-semibold transition-all duration-300 border-b-3 ${
                            activeTab === tab.id
                              ? 'text-yellow-400 border-yellow-400 bg-yellow-400/10'
                              : 'text-gray-400 border-transparent hover:text-gray-300 hover:bg-gray-800/30'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5" />
                            <span>{tab.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-8">
                  {/* Overview Tab - Enhanced */}
                  {activeTab === 'overview' && (
                    <div className="space-y-8">
                      {/* Key Metrics Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { 
                            label: 'Endpoints Discovered', 
                            value: result.metadata?.uniqueEndpoints || 0, 
                            color: 'text-yellow-400', 
                            bg: 'bg-yellow-400/10',
                            icon: Target,
                            trend: '+23%'
                          },
                          { 
                            label: 'Security Score', 
                            value: `${result.metadata?.securityScore || 0}%`, 
                            color: 'text-green-400', 
                            bg: 'bg-green-400/10',
                            icon: Shield,
                            trend: '+5%'
                          },
                          { 
                            label: 'API Coverage', 
                            value: `${result.metadata?.coverage || 0}%`, 
                            color: 'text-blue-400', 
                            bg: 'bg-blue-400/10',
                            icon: Activity,
                            trend: '+12%'
                          },
                          { 
                            label: 'Scan Duration', 
                            value: `${result.metadata?.crawlDuration || 0}s`, 
                            color: 'text-purple-400', 
                            bg: 'bg-purple-400/10',
                            icon: Clock,
                            trend: '-8%'
                          }
                        ].map((stat, index) => {
                          const Icon = stat.icon;
                          return (
                            <div key={index} className={`${stat.bg} rounded-2xl p-6 border border-gray-800/30 hover:border-gray-700/50 transition-all duration-300 group`}>
                              <div className="flex items-center justify-between mb-4">
                                <Icon className={`w-6 h-6 ${stat.color} group-hover:scale-110 transition-transform`} />
                                <span className="text-xs text-gray-400 font-medium">{stat.trend}</span>
                              </div>
                              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                              <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Domain Analysis */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-black/30 rounded-2xl p-6 border border-gray-800/30">
                          <h3 className="text-xl font-bold mb-6 flex items-center space-x-3">
                            <Network className="w-6 h-6 text-blue-400" />
                            <span>Domain Intelligence</span>
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <p className="text-gray-400 mb-2 font-medium">Discovered Subdomains</p>
                              <div className="flex flex-wrap gap-2">
                                {result.metadata?.domainAnalysis.subdomains.map((subdomain, i) => (
                                  <span key={i} className="px-3 py-1 bg-blue-400/10 text-blue-300 text-sm rounded-lg border border-blue-400/20">
                                    {subdomain}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-gray-400 mb-2 font-medium">Technology Stack</p>
                              <div className="flex flex-wrap gap-2">
                                {result.metadata?.domainAnalysis.technologies.map((tech, i) => (
                                  <span key={i} className="px-3 py-1 bg-purple-400/10 text-purple-300 text-sm rounded-lg border border-purple-400/20">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-black/30 rounded-2xl p-6 border border-gray-800/30">
                          <h3 className="text-xl font-bold mb-6 flex items-center space-x-3">
                            <CheckCircle className="w-6 h-6 text-green-400" />
                            <span>Discovery Summary</span>
                          </h3>
                          <div className="grid grid-cols-2 gap-6 text-sm">
                            <div>
                              <p className="text-gray-400 mb-3 font-medium">HTTP Methods</p>
                              <div className="space-y-2">
                                {Object.entries(
                                  result.endpoints.reduce((acc, ep) => {
                                    acc[ep.method] = (acc[ep.method] || 0) + 1;
                                    return acc;
                                  }, {} as Record<string, number>)
                                ).map(([method, count]) => (
                                  <div key={method} className="flex justify-between items-center">
                                    <span className={`px-2 py-1 rounded text-xs ${getMethodColor(method)}`}>{method}</span>
                                    <span className="text-yellow-400 font-bold">{count}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-gray-400 mb-3 font-medium">Security Distribution</p>
                              <div className="space-y-2">
                                {Object.entries(
                                  result.endpoints.reduce((acc, ep) => {
                                    const security = ep.security || 'unknown';
                                    acc[security] = (acc[security] || 0) + 1;
                                    return acc;
                                  }, {} as Record<string, number>)
                                ).map(([security, count]) => (
                                  <div key={security} className="flex justify-between items-center">
                                    <span className="text-gray-300 capitalize">{security}</span>
                                    <span className={`font-bold ${getSecurityColor(security)}`}>{count}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Endpoints Tab - Enhanced */}
                  {activeTab === 'endpoints' && (
                    <div className="space-y-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-bold">Discovered API Endpoints</h3>
                          <p className="text-gray-400">{filteredEndpoints.length} of {result.endpoints.length} endpoints shown</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <select
                            value={filterMethod}
                            onChange={(e) => setFilterMethod(e.target.value)}
                            className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:border-yellow-400/50 focus:outline-none"
                          >
                            <option value="ALL">All Methods</option>
                            {uniqueMethods.map(method => (
                              <option key={method} value={method}>{method}</option>
                            ))}
                          </select>
                          <select
                            value={filterSecurity}
                            onChange={(e) => setFilterSecurity(e.target.value)}
                            className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:border-yellow-400/50 focus:outline-none"
                          >
                            <option value="ALL">All Security Levels</option>
                            <option value="secure">Secure</option>
                            <option value="warning">Warning</option>
                            <option value="critical">Critical</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className={`space-y-3 max-h-96 overflow-y-auto ${viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : ''}`}>
                        {filteredEndpoints.map((endpoint, index) => (
                          <div
                            key={index}
                            onClick={() => setSelectedEndpoint(endpoint)}
                            className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                              selectedEndpoint === endpoint
                                ? 'border-yellow-400/50 bg-yellow-400/5 shadow-lg shadow-yellow-400/10'
                                : 'border-gray-800/30 bg-black/20 hover:border-gray-700/50 hover:bg-gray-900/30'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-4">
                                <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${getMethodColor(endpoint.method)}`}>
                                  {endpoint.method}
                                </span>
                                <span className="text-white font-mono text-lg">{endpoint.url}</span>
                              </div>
                              <div className={`px-3 py-1 rounded-lg border ${getSecurityBg(endpoint.security)}`}>
                                <span className={`text-xs font-medium ${getSecurityColor(endpoint.security)}`}>
                                  {endpoint.security?.toUpperCase()}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2">
                                  <span className="text-gray-400">Status:</span>
                                  <span className={`font-bold ${getStatusColor(endpoint.status)}`}>{endpoint.status}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-gray-400">Response:</span>
                                  <span className="text-white font-medium">{endpoint.responseTime}ms</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-gray-400">Size:</span>
                                  <span className="text-white font-medium">{(endpoint.size / 1024).toFixed(1)}KB</span>
                                </div>
                              </div>
                              <span className={getSecurityColor(endpoint.security)}>
                                {endpoint.security === 'secure' ? '🔒' : 
                                 endpoint.security === 'warning' ? '⚠️' : 
                                 endpoint.security === 'critical' ? '🚨' : '❓'}
                              </span>
                            </div>
                            
                            {endpoint.description && (
                              <p className="text-gray-400 text-sm mt-3 italic">{endpoint.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Security Tab - Enhanced */}
                  {activeTab === 'security' && (
                    <div className="space-y-8">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-6 shadow-lg">
                          <span className="text-3xl font-bold text-white">{result.metadata?.securityScore}%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Security Assessment</h3>
                        <p className="text-gray-400 text-lg">Advanced threat analysis and vulnerability detection</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { 
                            label: 'Secure Endpoints', 
                            count: result.endpoints.filter(ep => ep.security === 'secure').length, 
                            color: 'green',
                            icon: '🔒',
                            desc: 'Properly secured'
                          },
                          { 
                            label: 'Security Warnings', 
                            count: result.endpoints.filter(ep => ep.security === 'warning').length, 
                            color: 'yellow',
                            icon: '⚠️',
                            desc: 'Requires attention'
                          },
                          { 
                            label: 'Critical Vulnerabilities', 
                            count: result.endpoints.filter(ep => ep.security === 'critical').length, 
                            color: 'red',
                            icon: '🚨',
                            desc: 'Immediate action needed'
                          }
                        ].map((item, index) => (
                          <div key={index} className="bg-black/30 rounded-2xl p-6 border border-gray-800/30 text-center hover:border-gray-700/50 transition-all duration-300">
                            <div className="text-4xl mb-3">{item.icon}</div>
                            <div className={`text-3xl font-bold mb-2 ${
                              item.color === 'green' ? 'text-green-400' :
                              item.color === 'yellow' ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {item.count}
                            </div>
                            <h4 className="text-white font-semibold mb-1">{item.label}</h4>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                          </div>
                        ))}
                      </div>

                      {/* Security Details */}
                      <div className="bg-black/30 rounded-2xl p-6 border border-gray-800/30">
                        <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
                          <Shield className="w-5 h-5 text-yellow-400" />
                          <span>Detailed Security Analysis</span>
                        </h4>
                        <div className="space-y-4">
                          {result.endpoints.filter(ep => ep.security === 'critical' || ep.security === 'warning').map((endpoint, index) => (
                            <div key={index} className={`p-4 rounded-xl border ${getSecurityBg(endpoint.security)}`}>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                  <span className={`px-2 py-1 text-xs font-medium rounded ${getMethodColor(endpoint.method)}`}>
                                    {endpoint.method}
                                  </span>
                                  <span className="font-mono text-white">{endpoint.url}</span>
                                </div>
                                <span className={getSecurityColor(endpoint.security)}>
                                  {endpoint.security === 'warning' ? '⚠️' : '🚨'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-300">{endpoint.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Performance Tab - New */}
                  {activeTab === 'performance' && (
                    <div className="space-y-8">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-3">Performance Analytics</h3>
                        <p className="text-gray-400 text-lg">Comprehensive endpoint performance analysis</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { 
                            label: 'Average Response Time', 
                            value: `${result.metadata?.performanceMetrics.avgResponseTime || 0}ms`, 
                            color: 'text-blue-400',
                            icon: Clock
                          },
                          { 
                            label: 'Error Rate', 
                            value: `${result.metadata?.performanceMetrics.errorRate || 0}%`, 
                            color: 'text-red-400',
                            icon: AlertCircle
                          },
                          { 
                            label: 'Fastest Endpoint', 
                            value: result.metadata?.performanceMetrics.fastestEndpoint || 'N/A', 
                            color: 'text-green-400',
                            icon: Zap
                          },
                          { 
                            label: 'Slowest Endpoint', 
                            value: result.metadata?.performanceMetrics.slowestEndpoint || 'N/A', 
                            color: 'text-yellow-400',
                            icon: Clock
                          }
                        ].map((metric, index) => {
                          const Icon = metric.icon;
                          return (
                            <div key={index} className="bg-black/30 rounded-2xl p-6 border border-gray-800/30">
                              <Icon className={`w-6 h-6 ${metric.color} mb-3`} />
                              <div className={`text-2xl font-bold ${metric.color} mb-2`}>{metric.value}</div>
                              <p className="text-sm text-gray-400">{metric.label}</p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Response Time Distribution */}
                      <div className="bg-black/30 rounded-2xl p-6 border border-gray-800/30">
                        <h4 className="text-xl font-bold mb-6 flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-green-400" />
                          <span>Response Time Distribution</span>
                        </h4>
                        <div className="space-y-3">
                          {result.endpoints.map((endpoint, index) => (
                            <div key={index} className="flex items-center space-x-4">
                              <span className={`px-2 py-1 text-xs font-medium rounded ${getMethodColor(endpoint.method)} w-16 text-center`}>
                                {endpoint.method}
                              </span>
                              <div className="flex-1 bg-gray-800/50 rounded-full h-3 overflow-hidden">
                                <div 
                                  className={`h-3 rounded-full transition-all duration-1000 ${
                                    (endpoint.responseTime || 0) < 200 ? 'bg-green-400' :
                                    (endpoint.responseTime || 0) < 500 ? 'bg-yellow-400' :
                                    'bg-red-400'
                                  }`}
                                  style={{ width: `${Math.min((endpoint.responseTime || 0) / 1000 * 100, 100)}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-300 w-16 text-right">{endpoint.responseTime}ms</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Export Tab - Enhanced */}
                  {activeTab === 'export' && (
                    <div className="space-y-8">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-3">Export & Integration</h3>
                        <p className="text-gray-400 text-lg">Export your discoveries in multiple formats</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { 
                            title: 'Postman Collection', 
                            desc: 'Ready-to-use collection with all discovered endpoints', 
                            icon: Download, 
                            format: 'JSON',
                            color: 'orange'
                          },
                          { 
                            title: 'OpenAPI 3.0 Specification', 
                            desc: 'Complete API documentation with schemas', 
                            icon: Code, 
                            format: 'YAML',
                            color: 'blue'
                          },
                          { 
                            title: 'Security Report', 
                            desc: 'Comprehensive vulnerability assessment', 
                            icon: Shield, 
                            format: 'PDF',
                            color: 'red'
                          },
                          { 
                            title: 'CSV Data Export', 
                            desc: 'Raw endpoint data for analysis', 
                            icon: Database, 
                            format: 'CSV',
                            color: 'green'
                          },
                          { 
                            title: 'Burp Suite Configuration', 
                            desc: 'Import targets into Burp Suite', 
                            icon: Settings, 
                            format: 'XML',
                            color: 'purple'
                          },
                          { 
                            title: 'OWASP ZAP Context', 
                            desc: 'Load endpoints into OWASP ZAP', 
                            icon: Globe, 
                            format: 'XML',
                            color: 'cyan'
                          }
                        ].map((option, index) => {
                          const Icon = option.icon;
                          return (
                            <button
                              key={index}
                              className="p-6 bg-black/30 rounded-2xl border border-gray-800/30 hover:border-gray-700/50 transition-all duration-300 text-left group hover:scale-[1.02]"
                            >
                              <div className="flex items-start justify-between mb-4">
                                <Icon className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform" />
                                <span className={`text-xs px-3 py-1 rounded-lg font-medium ${
                                  option.color === 'orange' ? 'bg-orange-400/10 text-orange-300' :
                                  option.color === 'blue' ? 'bg-blue-400/10 text-blue-300' :
                                  option.color === 'red' ? 'bg-red-400/10 text-red-300' :
                                  option.color === 'green' ? 'bg-green-400/10 text-green-300' :
                                  option.color === 'purple' ? 'bg-purple-400/10 text-purple-300' :
                                  'bg-cyan-400/10 text-cyan-300'
                                }`}>
                                  {option.format}
                                </span>
                              </div>
                              <h4 className="text-white font-bold mb-2 text-lg">{option.title}</h4>
                              <p className="text-sm text-gray-400 leading-relaxed">{option.desc}</p>
                            </button>
                          );
                        })}
                      </div>

                      {/* Integration Instructions */}
                      <div className="bg-black/30 rounded-2xl p-6 border border-gray-800/30">
                        <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
                          <Code className="w-5 h-5 text-blue-400" />
                          <span>API Integration</span>
                        </h4>
                        <div className="bg-gray-900/50 rounded-xl p-4 font-mono text-sm">
                          <div className="text-gray-400 mb-2">// Example: Integrate with your CI/CD pipeline</div>
                          <div className="text-green-400">curl -X POST https://api.ziro.dev/v1/discover \</div>
                          <div className="text-blue-400 ml-4">-H "Authorization: Bearer YOUR_API_KEY" \</div>
                          <div className="text-yellow-400 ml-4">-d '{`{"target": "https://api.example.com"}`}'</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Live Console */}
            {showLogs && (
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="p-4 border-b border-gray-800/50 bg-black/20 flex items-center justify-between">
                  <h3 className="font-bold flex items-center space-x-2">
                    <Terminal className="w-5 h-5 text-green-400" />
                    <span>Neural Console</span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-400 font-medium">ONLINE</span>
                  </div>
                </div>
                <div 
                  ref={logsRef}
                  className="h-80 overflow-y-auto p-4 bg-black/30 font-mono text-sm space-y-2"
                >
                  {logs.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">
                      <Monitor className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>Neural engine ready for deployment...</p>
                    </div>
                  ) : (
                    logs.map((log, index) => (
                      <div key={index} className="text-gray-300 leading-relaxed hover:bg-gray-800/30 px-2 py-1 rounded">
                        <span className="text-gray-500 text-xs mr-3">
                          {new Date().toLocaleTimeString()}
                        </span>
                        <span>{log}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* System Status */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="font-bold mb-6 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-400" />
                <span>System Status</span>
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Neural Engine', status: 'Operational', color: 'green', load: 92 },
                  { label: 'Stealth Protocol', status: 'Active', color: 'blue', load: 78 },
                  { label: 'Security Scanner', status: 'Ready', color: 'yellow', load: 45 },
                  { label: 'Export Service', status: 'Online', color: 'green', load: 23 }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400 font-medium">{item.label}</span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          item.color === 'green' ? 'bg-green-400' :
                          item.color === 'blue' ? 'bg-blue-400' :
                          item.color === 'yellow' ? 'bg-yellow-400' :
                          'bg-gray-400'
                        } ${item.color === 'green' ? 'animate-pulse' : ''}`}></div>
                        <span className="text-xs text-gray-300 font-medium">{item.status}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-800/50 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          item.color === 'green' ? 'bg-green-400' :
                          item.color === 'blue' ? 'bg-blue-400' :
                          item.color === 'yellow' ? 'bg-yellow-400' :
                          'bg-gray-400'
                        }`}
                        style={{ width: `${item.load}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Endpoint Details */}
            {selectedEndpoint && (
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="font-bold mb-6 flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-purple-400" />
                  <span>Endpoint Analysis</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">HTTP Method</p>
                    <span className={`px-3 py-1 text-sm font-bold rounded-lg border ${getMethodColor(selectedEndpoint.method)}`}>
                      {selectedEndpoint.method}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Endpoint URL</p>
                    <p className="text-sm font-mono text-white break-all bg-black/30 p-3 rounded-lg">{selectedEndpoint.url}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Status Code</p>
                      <p className={`text-lg font-bold ${getStatusColor(selectedEndpoint.status)}`}>
                        {selectedEndpoint.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Response Time</p>
                      <p className="text-lg font-bold text-white">{selectedEndpoint.responseTime}ms</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Security Level</p>
                    <div className="flex items-center space-x-2">
                      <span className={`capitalize font-bold ${getSecurityColor(selectedEndpoint.security)}`}>
                        {selectedEndpoint.security}
                      </span>
                      <span className={`${getSecurityColor(selectedEndpoint.security)} text-lg`}>
                        {selectedEndpoint.security === 'secure' ? '🔒' : 
                         selectedEndpoint.security === 'warning' ? '⚠️' : 
                         selectedEndpoint.security === 'critical' ? '🚨' : '❓'}
                      </span>
                    </div>
                  </div>
                  {selectedEndpoint.parameters && selectedEndpoint.parameters.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Parameters</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedEndpoint.parameters.map((param, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded border border-gray-700/50">
                            {param}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedEndpoint.description && (
                    <div>
                      <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Description</p>
                      <p className="text-sm text-gray-300 leading-relaxed italic">{selectedEndpoint.description}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="font-bold mb-6 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Quick Actions</span>
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Export All Results', icon: Download, color: 'bg-blue-400/10 hover:bg-blue-400/20 text-blue-300' },
                  { label: 'Generate Report', icon: FileText, color: 'bg-green-400/10 hover:bg-green-400/20 text-green-300' },
                  { label: 'Share Discovery', icon: ExternalLink, color: 'bg-purple-400/10 hover:bg-purple-400/20 text-purple-300' },
                  { label: 'Schedule Scan', icon: Clock, color: 'bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-300' }
                ].map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className={`w-full p-3 rounded-xl transition-all duration-300 text-left flex items-center space-x-3 ${action.color}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
