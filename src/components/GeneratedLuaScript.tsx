interface LuaScriptConfig {
  keyLength: number;
  expirationHours: number;
  hwidLock: boolean;
  maxUsages: number;
  linkCheckpoint: string;
  webhookUrl: string;
  scriptName: string;
}

export const generateLuaLoader = (config: LuaScriptConfig): string => {
  return `--[[
    ScriptShield Protected Script
    Generated: ${new Date().toISOString()}
    Script: ${config.scriptName}
    
    This loader creates a floating UI for key verification
    with HWID locking support for Roblox executors
]]--

-- Configuration
local CONFIG = {
    ScriptName = "${config.scriptName}",
    KeyLength = ${config.keyLength},
    ExpirationHours = ${config.expirationHours},
    HWIDLock = ${config.hwidLock},
    MaxUsages = ${config.maxUsages},
    LinkCheckpoint = "${config.linkCheckpoint || 'https://example.com/getkey'}",
    WebhookURL = "${config.webhookUrl || ''}",
    VerifyEndpoint = "https://your-api.com/api/verify", -- Replace with your API
}

-- Services
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local HttpService = game:GetService("HttpService")
local UserInputService = game:GetService("UserInputService")

local LocalPlayer = Players.LocalPlayer
local PlayerGui = LocalPlayer:WaitForChild("PlayerGui")

-- Get HWID (executor-dependent)
local function getHWID()
    local hwid = "UNKNOWN"
    pcall(function()
        if gethwid then
            hwid = gethwid()
        elseif get_hwid then
            hwid = get_hwid()
        elseif getexecutorname then
            hwid = game:GetService("RbxAnalyticsService"):GetClientId()
        else
            hwid = game:GetService("RbxAnalyticsService"):GetClientId()
        end
    end)
    return hwid
end

-- Create UI
local function createKeyUI()
    -- Destroy existing UI if any
    if PlayerGui:FindFirstChild("ScriptShieldUI") then
        PlayerGui.ScriptShieldUI:Destroy()
    end

    local ScreenGui = Instance.new("ScreenGui")
    ScreenGui.Name = "ScriptShieldUI"
    ScreenGui.ResetOnSpawn = false
    ScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
    ScreenGui.Parent = PlayerGui

    -- Main Container with blur effect
    local BlurFrame = Instance.new("Frame")
    BlurFrame.Name = "BlurFrame"
    BlurFrame.Size = UDim2.new(1, 0, 1, 0)
    BlurFrame.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
    BlurFrame.BackgroundTransparency = 0.5
    BlurFrame.Parent = ScreenGui

    -- Main Window
    local MainFrame = Instance.new("Frame")
    MainFrame.Name = "MainFrame"
    MainFrame.Size = UDim2.new(0, 420, 0, 380)
    MainFrame.Position = UDim2.new(0.5, -210, 0.5, -190)
    MainFrame.BackgroundColor3 = Color3.fromRGB(15, 20, 25)
    MainFrame.BorderSizePixel = 0
    MainFrame.Parent = ScreenGui

    local MainCorner = Instance.new("UICorner")
    MainCorner.CornerRadius = UDim.new(0, 12)
    MainCorner.Parent = MainFrame

    local MainStroke = Instance.new("UIStroke")
    MainStroke.Color = Color3.fromRGB(34, 197, 94)
    MainStroke.Thickness = 2
    MainStroke.Parent = MainFrame

    -- Glow effect
    local Glow = Instance.new("ImageLabel")
    Glow.Name = "Glow"
    Glow.Size = UDim2.new(1, 60, 1, 60)
    Glow.Position = UDim2.new(0, -30, 0, -30)
    Glow.BackgroundTransparency = 1
    Glow.Image = "rbxassetid://5028857084"
    Glow.ImageColor3 = Color3.fromRGB(34, 197, 94)
    Glow.ImageTransparency = 0.85
    Glow.ScaleType = Enum.ScaleType.Slice
    Glow.SliceCenter = Rect.new(24, 24, 276, 276)
    Glow.Parent = MainFrame

    -- Header
    local Header = Instance.new("Frame")
    Header.Name = "Header"
    Header.Size = UDim2.new(1, 0, 0, 60)
    Header.BackgroundColor3 = Color3.fromRGB(20, 25, 30)
    Header.BorderSizePixel = 0
    Header.Parent = MainFrame

    local HeaderCorner = Instance.new("UICorner")
    HeaderCorner.CornerRadius = UDim.new(0, 12)
    HeaderCorner.Parent = Header

    local Title = Instance.new("TextLabel")
    Title.Name = "Title"
    Title.Size = UDim2.new(1, -20, 0, 30)
    Title.Position = UDim2.new(0, 10, 0, 10)
    Title.BackgroundTransparency = 1
    Title.Font = Enum.Font.GothamBold
    Title.Text = "🛡️ " .. CONFIG.ScriptName
    Title.TextColor3 = Color3.fromRGB(34, 197, 94)
    Title.TextSize = 18
    Title.TextXAlignment = Enum.TextXAlignment.Left
    Title.Parent = Header

    local Subtitle = Instance.new("TextLabel")
    Subtitle.Name = "Subtitle"
    Subtitle.Size = UDim2.new(1, -20, 0, 16)
    Subtitle.Position = UDim2.new(0, 10, 0, 36)
    Subtitle.BackgroundTransparency = 1
    Subtitle.Font = Enum.Font.Gotham
    Subtitle.Text = "Key Verification System"
    Subtitle.TextColor3 = Color3.fromRGB(150, 150, 150)
    Subtitle.TextSize = 12
    Subtitle.TextXAlignment = Enum.TextXAlignment.Left
    Subtitle.Parent = Header

    -- Content
    local Content = Instance.new("Frame")
    Content.Name = "Content"
    Content.Size = UDim2.new(1, -40, 0, 240)
    Content.Position = UDim2.new(0, 20, 0, 80)
    Content.BackgroundTransparency = 1
    Content.Parent = MainFrame

    -- HWID Display
    local HWIDFrame = Instance.new("Frame")
    HWIDFrame.Name = "HWIDFrame"
    HWIDFrame.Size = UDim2.new(1, 0, 0, 50)
    HWIDFrame.BackgroundColor3 = Color3.fromRGB(25, 30, 35)
    HWIDFrame.BorderSizePixel = 0
    HWIDFrame.Parent = Content

    local HWIDCorner = Instance.new("UICorner")
    HWIDCorner.CornerRadius = UDim.new(0, 8)
    HWIDCorner.Parent = HWIDFrame

    local HWIDLabel = Instance.new("TextLabel")
    HWIDLabel.Name = "HWIDLabel"
    HWIDLabel.Size = UDim2.new(1, -20, 0, 20)
    HWIDLabel.Position = UDim2.new(0, 10, 0, 5)
    HWIDLabel.BackgroundTransparency = 1
    HWIDLabel.Font = Enum.Font.Gotham
    HWIDLabel.Text = "Your HWID:"
    HWIDLabel.TextColor3 = Color3.fromRGB(100, 100, 100)
    HWIDLabel.TextSize = 11
    HWIDLabel.TextXAlignment = Enum.TextXAlignment.Left
    HWIDLabel.Parent = HWIDFrame

    local HWIDValue = Instance.new("TextLabel")
    HWIDValue.Name = "HWIDValue"
    HWIDValue.Size = UDim2.new(1, -20, 0, 20)
    HWIDValue.Position = UDim2.new(0, 10, 0, 25)
    HWIDValue.BackgroundTransparency = 1
    HWIDValue.Font = Enum.Font.Code
    HWIDValue.Text = getHWID()
    HWIDValue.TextColor3 = Color3.fromRGB(34, 197, 94)
    HWIDValue.TextSize = 11
    HWIDValue.TextXAlignment = Enum.TextXAlignment.Left
    HWIDValue.TextTruncate = Enum.TextTruncate.AtEnd
    HWIDValue.Parent = HWIDFrame

    -- Key Input
    local KeyInputFrame = Instance.new("Frame")
    KeyInputFrame.Name = "KeyInputFrame"
    KeyInputFrame.Size = UDim2.new(1, 0, 0, 50)
    KeyInputFrame.Position = UDim2.new(0, 0, 0, 65)
    KeyInputFrame.BackgroundColor3 = Color3.fromRGB(25, 30, 35)
    KeyInputFrame.BorderSizePixel = 0
    KeyInputFrame.Parent = Content

    local KeyInputCorner = Instance.new("UICorner")
    KeyInputCorner.CornerRadius = UDim.new(0, 8)
    KeyInputCorner.Parent = KeyInputFrame

    local KeyInputStroke = Instance.new("UIStroke")
    KeyInputStroke.Color = Color3.fromRGB(50, 55, 60)
    KeyInputStroke.Thickness = 1
    KeyInputStroke.Parent = KeyInputFrame

    local KeyInput = Instance.new("TextBox")
    KeyInput.Name = "KeyInput"
    KeyInput.Size = UDim2.new(1, -20, 1, 0)
    KeyInput.Position = UDim2.new(0, 10, 0, 0)
    KeyInput.BackgroundTransparency = 1
    KeyInput.Font = Enum.Font.Code
    KeyInput.PlaceholderText = "Enter your key here..."
    KeyInput.PlaceholderColor3 = Color3.fromRGB(80, 80, 80)
    KeyInput.Text = ""
    KeyInput.TextColor3 = Color3.fromRGB(255, 255, 255)
    KeyInput.TextSize = 14
    KeyInput.TextXAlignment = Enum.TextXAlignment.Left
    KeyInput.ClearTextOnFocus = false
    KeyInput.Parent = KeyInputFrame

    -- Status Label
    local StatusLabel = Instance.new("TextLabel")
    StatusLabel.Name = "StatusLabel"
    StatusLabel.Size = UDim2.new(1, 0, 0, 20)
    StatusLabel.Position = UDim2.new(0, 0, 0, 125)
    StatusLabel.BackgroundTransparency = 1
    StatusLabel.Font = Enum.Font.Gotham
    StatusLabel.Text = ""
    StatusLabel.TextColor3 = Color3.fromRGB(255, 100, 100)
    StatusLabel.TextSize = 12
    StatusLabel.Parent = Content

    -- Verify Button
    local VerifyButton = Instance.new("TextButton")
    VerifyButton.Name = "VerifyButton"
    VerifyButton.Size = UDim2.new(1, 0, 0, 45)
    VerifyButton.Position = UDim2.new(0, 0, 0, 155)
    VerifyButton.BackgroundColor3 = Color3.fromRGB(34, 197, 94)
    VerifyButton.BorderSizePixel = 0
    VerifyButton.Font = Enum.Font.GothamBold
    VerifyButton.Text = "🔓 VERIFY KEY"
    VerifyButton.TextColor3 = Color3.fromRGB(0, 0, 0)
    VerifyButton.TextSize = 14
    VerifyButton.AutoButtonColor = true
    VerifyButton.Parent = Content

    local VerifyCorner = Instance.new("UICorner")
    VerifyCorner.CornerRadius = UDim.new(0, 8)
    VerifyCorner.Parent = VerifyButton

    -- Get Key Button
    local GetKeyButton = Instance.new("TextButton")
    GetKeyButton.Name = "GetKeyButton"
    GetKeyButton.Size = UDim2.new(1, 0, 0, 40)
    GetKeyButton.Position = UDim2.new(0, 0, 0, 210)
    GetKeyButton.BackgroundColor3 = Color3.fromRGB(25, 30, 35)
    GetKeyButton.BorderSizePixel = 0
    GetKeyButton.Font = Enum.Font.GothamSemibold
    GetKeyButton.Text = "🔑 Get Key (Copy Link)"
    GetKeyButton.TextColor3 = Color3.fromRGB(34, 197, 94)
    GetKeyButton.TextSize = 13
    GetKeyButton.AutoButtonColor = true
    GetKeyButton.Parent = Content

    local GetKeyCorner = Instance.new("UICorner")
    GetKeyCorner.CornerRadius = UDim.new(0, 8)
    GetKeyCorner.Parent = GetKeyButton

    local GetKeyStroke = Instance.new("UIStroke")
    GetKeyStroke.Color = Color3.fromRGB(34, 197, 94)
    GetKeyStroke.Thickness = 1
    GetKeyStroke.Transparency = 0.5
    GetKeyStroke.Parent = GetKeyButton

    -- Draggable functionality
    local dragging = false
    local dragInput, dragStart, startPos

    local function update(input)
        local delta = input.Position - dragStart
        MainFrame.Position = UDim2.new(
            startPos.X.Scale,
            startPos.X.Offset + delta.X,
            startPos.Y.Scale,
            startPos.Y.Offset + delta.Y
        )
    end

    Header.InputBegan:Connect(function(input)
        if input.UserInputType == Enum.UserInputType.MouseButton1 or input.UserInputType == Enum.UserInputType.Touch then
            dragging = true
            dragStart = input.Position
            startPos = MainFrame.Position

            input.Changed:Connect(function()
                if input.UserInputState == Enum.UserInputState.End then
                    dragging = false
                end
            end)
        end
    end)

    Header.InputChanged:Connect(function(input)
        if input.UserInputType == Enum.UserInputType.MouseMovement or input.UserInputType == Enum.UserInputType.Touch then
            dragInput = input
        end
    end)

    UserInputService.InputChanged:Connect(function(input)
        if input == dragInput and dragging then
            update(input)
        end
    end)

    -- Button Hover Effects
    local function createHover(button, normalColor, hoverColor)
        button.MouseEnter:Connect(function()
            TweenService:Create(button, TweenInfo.new(0.2), {BackgroundColor3 = hoverColor}):Play()
        end)
        button.MouseLeave:Connect(function()
            TweenService:Create(button, TweenInfo.new(0.2), {BackgroundColor3 = normalColor}):Play()
        end)
    end

    createHover(VerifyButton, Color3.fromRGB(34, 197, 94), Color3.fromRGB(22, 163, 74))
    createHover(GetKeyButton, Color3.fromRGB(25, 30, 35), Color3.fromRGB(35, 40, 45))

    -- Get Key functionality
    GetKeyButton.MouseButton1Click:Connect(function()
        local link = CONFIG.LinkCheckpoint .. "?hwid=" .. getHWID()
        if setclipboard then
            setclipboard(link)
            StatusLabel.Text = "✅ Link copied! Open in browser to get key"
            StatusLabel.TextColor3 = Color3.fromRGB(34, 197, 94)
        else
            StatusLabel.Text = "📋 " .. link
            StatusLabel.TextColor3 = Color3.fromRGB(255, 200, 100)
        end
    end)

    -- Verify functionality
    VerifyButton.MouseButton1Click:Connect(function()
        local key = KeyInput.Text
        if key == "" then
            StatusLabel.Text = "❌ Please enter a key!"
            StatusLabel.TextColor3 = Color3.fromRGB(255, 100, 100)
            return
        end

        StatusLabel.Text = "⏳ Verifying..."
        StatusLabel.TextColor3 = Color3.fromRGB(255, 200, 100)
        VerifyButton.Text = "VERIFYING..."

        -- Simulate verification (replace with actual API call)
        local success, result = pcall(function()
            -- In production, make HTTP request to your verification API
            -- return HttpService:JSONDecode(
            --     game:HttpGet(CONFIG.VerifyEndpoint .. "?key=" .. key .. "&hwid=" .. getHWID())
            -- )
            
            -- For demo: check if key starts with "SHIELD-"
            return {
                valid = string.sub(key, 1, 7) == "SHIELD-" and #key >= 20,
                message = "Key validated successfully!"
            }
        end)

        if success and result.valid then
            StatusLabel.Text = "✅ " .. (result.message or "Key verified!")
            StatusLabel.TextColor3 = Color3.fromRGB(34, 197, 94)
            
            -- Success animation
            TweenService:Create(MainFrame, TweenInfo.new(0.3), {
                BackgroundColor3 = Color3.fromRGB(20, 40, 25)
            }):Play()
            
            wait(1)
            
            -- Close UI and load main script
            ScreenGui:Destroy()
            
            -- Load your protected script here
            -- loadstring(game:HttpGet("YOUR_PROTECTED_SCRIPT_URL"))()
            print("[ScriptShield] Key verified! Loading protected script...")
            
        else
            StatusLabel.Text = "❌ Invalid key or HWID mismatch!"
            StatusLabel.TextColor3 = Color3.fromRGB(255, 100, 100)
            VerifyButton.Text = "🔓 VERIFY KEY"
            
            -- Error shake animation
            for i = 1, 3 do
                MainFrame.Position = MainFrame.Position + UDim2.new(0, 5, 0, 0)
                wait(0.05)
                MainFrame.Position = MainFrame.Position - UDim2.new(0, 10, 0, 0)
                wait(0.05)
                MainFrame.Position = MainFrame.Position + UDim2.new(0, 5, 0, 0)
            end
        end
    end)

    -- Intro animation
    MainFrame.Size = UDim2.new(0, 0, 0, 0)
    MainFrame.Position = UDim2.new(0.5, 0, 0.5, 0)
    TweenService:Create(MainFrame, TweenInfo.new(0.4, Enum.EasingStyle.Back), {
        Size = UDim2.new(0, 420, 0, 380),
        Position = UDim2.new(0.5, -210, 0.5, -190)
    }):Play()

    return ScreenGui
end

-- Initialize
createKeyUI()
`;
};

export const generateObfuscatedScript = (originalScript: string, config: LuaScriptConfig): string => {
  const loader = generateLuaLoader(config);
  
  return `--[[
    ╔═══════════════════════════════════════════════════════════╗
    ║           PROTECTED BY SCRIPTSHIELD                       ║
    ║           https://scriptshield.dev                        ║
    ╠═══════════════════════════════════════════════════════════╣
    ║  Script: ${config.scriptName.padEnd(46)}║
    ║  Generated: ${new Date().toLocaleString().padEnd(43)}║
    ║  HWID Lock: ${config.hwidLock ? 'ENABLED' : 'DISABLED'}${' '.repeat(config.hwidLock ? 36 : 35)}║
    ╚═══════════════════════════════════════════════════════════╝
]]--

${loader}

--[[ 
    PROTECTED SCRIPT CONTENT (Obfuscated)
    Will be loaded after key verification
    
    Original Script Preview:
    ${originalScript.substring(0, 100).replace(/\n/g, '\n    ')}...
]]--
`;
};
