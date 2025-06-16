// Game navigation functions
function startGame() {
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('gameScreen').classList.add('active');
    initializeGame();
}

function goBack() {
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('startScreen').classList.add('active');
}

// Reset the entire game
function resetGame() {
    // Reset all game variables
    gameActive = false;
    waterDrops = [];
    dropCounter = 0;
    selectedDrop = null;
    followingDrop = null;
    currentProcessingTool = null;
    processingTimer = null;
    waterLevel = 0;
    currentRuleLevel = 1;
    dropsCollected = 0;
    availableWaterTypes = ['clean'];
    seenWaterTypes = new Set(['clean']);
    playerHasWon = false; // Reset win state
    
    // Reset timer system
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
    timeRemaining = 120;
    timerStarted = false;
    
    // Clear any following drops
    if (followingDrop) {
        followingDrop.remove();
        followingDrop = null;
    }
    
    // Reset cursor
    document.body.style.cursor = 'default';
    
    // Clear tool drops
    toolDrops = {
        microscope: null,
        filter: null,
        'boiling-pot': null
    };
    
    // Close any open dialogs
    hideAllDialogs();
    
    // Go back to start screen
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('startScreen').classList.add('active');
    
    // Make sure win screen is hidden
    document.getElementById('winScreen').classList.remove('active');
    // Make sure loss screen is hidden
    document.getElementById('lossScreen').classList.remove('active');
}

// Secret dev function to fill reservoir instantly
function fillReservoir() {
    waterLevel = 20;
    dropsCollected = 20;
    updateWaterLevel();
    
    // Stop timer and trigger win screen
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
    
    setTimeout(() => {
        showWinScreen();
    }, 500);
}

// Secret timer function to set timer to 2 seconds
function fastTimer() {
    if (gameActive && timerStarted) {
        timeRemaining = 2;
        updateTimerDisplay();

    } else {

    }
}

// Show win screen
function showWinScreen() {
    console.log('WIN: showWinScreen called');
    
    // Stop timer
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
        console.log('WIN: Timer stopped');
    }
    
    // Stop game
    gameActive = false;
    playerHasWon = true; // Mark player as having won
    console.log('WIN: gameActive set to false');
    
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        console.log('WIN: Removed active from', screen.id);
    });
    
    // Explicitly hide loss screen
    document.getElementById('lossScreen').classList.remove('active');
    document.getElementById('lossScreen').style.display = 'none';
    
    // Show only win screen
    const winScreen = document.getElementById('winScreen');
    winScreen.classList.add('active');
    console.log('WIN: Added active to winScreen');
    console.log('WIN: winScreen classes:', winScreen.className);
    
    // Clear any following drops
    if (followingDrop) {
        followingDrop.remove();
        followingDrop = null;
    }
    
    // Reset cursor
    document.body.style.cursor = 'default';
    
    // Trigger celebration effects
    setTimeout(() => {
        createConfettiCelebration();
        createCelebrationBurst();
    }, 500);
}

// Create massive emoji confetti celebration effect
function createConfettiCelebration() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    confettiContainer.id = 'confettiContainer';
    
    // Celebration emojis - water themed and general celebration
    const celebrationEmojis = [
        '🎉', '🎊', '✨', '🌟', '⭐', '💫', '🎈', '🎁', '🏆', '🥳',
        '💧', '🌊', '💦', '🚰', '🏺', '🌍', '🌎', '🌏', '💙', '💎',
        '🎯', '✅', '🔥', '💪', '👏', '🙌', '🎵', '🎶', '🌈', '☀️',
        '🎭', '🎪', '🎨', '🎲', '🎸', '🎺', '🎻', '🥁', '🎤', '🎧'
    ];
    
    // Create 80 emoji confetti pieces for massive effect!
    for (let i = 0; i < 80; i++) {
        const emojiConfetti = document.createElement('div');
        emojiConfetti.className = 'emoji-confetti';
        
        // Random emoji
        const randomEmoji = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
        emojiConfetti.textContent = randomEmoji;
        
        // Random speed class
        const speeds = ['', 'fast', 'slow'];
        const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];
        if (randomSpeed) {
            emojiConfetti.classList.add(randomSpeed);
        }
        
        // Random horizontal position
        emojiConfetti.style.left = Math.random() * 100 + '%';
        
        // Random animation delay (spread over 4 seconds)
        emojiConfetti.style.animationDelay = Math.random() * 4 + 's';
        
        // Random size variation
        const sizes = ['20px', '24px', '28px', '32px', '36px'];
        emojiConfetti.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)];
        
        confettiContainer.appendChild(emojiConfetti);
    }
    
    document.body.appendChild(confettiContainer);
    
    // Create multiple waves of confetti
    setTimeout(() => createSecondWave(confettiContainer), 2000);
    setTimeout(() => createThirdWave(confettiContainer), 4000);
    
    // Remove confetti after all animations complete
    setTimeout(() => {
        if (confettiContainer.parentNode) {
            confettiContainer.remove();
        }
    }, 12000);
}

// Create second wave of confetti
function createSecondWave(container) {
    const waveEmojis = ['🎉', '💧', '✨', '🌟', '🎊', '💦', '🏆', '🥳', '💙', '🌊'];
    
    for (let i = 0; i < 40; i++) {
        const emojiConfetti = document.createElement('div');
        emojiConfetti.className = 'emoji-confetti fast';
        
        const randomEmoji = waveEmojis[Math.floor(Math.random() * waveEmojis.length)];
        emojiConfetti.textContent = randomEmoji;
        
        emojiConfetti.style.left = Math.random() * 100 + '%';
        emojiConfetti.style.animationDelay = Math.random() * 2 + 's';
        emojiConfetti.style.fontSize = '30px';
        
        container.appendChild(emojiConfetti);
    }
}

// Create third wave of confetti
function createThirdWave(container) {
    const finalEmojis = ['🎉', '🎊', '🏆', '✨', '💧', '🌟', '💙', '🥳'];
    
    for (let i = 0; i < 30; i++) {
        const emojiConfetti = document.createElement('div');
        emojiConfetti.className = 'emoji-confetti slow';
        
        const randomEmoji = finalEmojis[Math.floor(Math.random() * finalEmojis.length)];
        emojiConfetti.textContent = randomEmoji;
        
        emojiConfetti.style.left = Math.random() * 100 + '%';
        emojiConfetti.style.animationDelay = Math.random() * 1 + 's';
        emojiConfetti.style.fontSize = '26px';
        
        container.appendChild(emojiConfetti);
    }
}

// Create celebration burst effect
function createCelebrationBurst() {
    const burstContainer = document.createElement('div');
    burstContainer.className = 'celebration-burst';
    
    // Create 12 burst particles
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'burst-particle';
        
        // Calculate random direction
        const angle = (i / 12) * 2 * Math.PI;
        const distance = 100 + Math.random() * 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.style.setProperty('--x', x + 'px');
        particle.style.setProperty('--y', y + 'px');
        
        // Random colors
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        burstContainer.appendChild(particle);
    }
    
    document.body.appendChild(burstContainer);
    
    // Remove burst after animation completes
    setTimeout(() => {
        if (burstContainer.parentNode) {
            burstContainer.remove();
        }
    }, 2000);
}

// Secret key combination to show dev button (Ctrl+Shift+D)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        const devButton = document.getElementById('secretDevButton');
        if (devButton.style.display === 'none' || devButton.style.display === '') {
            devButton.style.display = 'block';
            console.log('🎮 DEV: Secret dev button activated!');
        } else {
            devButton.style.display = 'none';
            console.log('🎮 DEV: Secret dev button hidden!');
        }
    }
    
    // Secret timer button toggle (Ctrl+Shift+T)
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        const secretTimerButton = document.getElementById('secretTimerButton');
        if (secretTimerButton.style.opacity === '0' || secretTimerButton.style.opacity === '') {
            secretTimerButton.style.opacity = '1';
            secretTimerButton.style.pointerEvents = 'auto';
            console.log('⏰ DEV: Secret timer button shown!');
        } else {
            secretTimerButton.style.opacity = '0';
            secretTimerButton.style.pointerEvents = 'none';
            console.log('⏰ DEV: Secret timer button hidden!');
        }
    }
});

// Game variables
let gameActive = false;
let waterDrops = [];
let dropCounter = 0;
let selectedDrop = null;
let followingDrop = null;
let currentProcessingTool = null;
let processingTimer = null;
let waterLevel = 0; // Current water level (0-20)
let currentWeather = 'Precipitation-free, Humid';

// Timer system (BETA feature)
let gameTimer = null;
let timeRemaining = 120; // 120 seconds (2 minutes)
let timerStarted = false;


// Progressive rule system
let currentRuleLevel = 1;
let dropsCollected = 0;
let availableWaterTypes = ['clean']; // Start with only clean water
let seenWaterTypes = new Set(['clean']); // Track which water types have been seen

// Track drops in tools - persists even when dialogs are closed
let toolDrops = {
    microscope: null,
    filter: null,
    'boiling-pot': null
};

// Water drop types and their properties
const WATER_TYPES = {
    clean: { name: 'Clean', canGoTo: ['reservoir', 'microscope'], color: '#4A90E2' },
    polluted: { name: 'Polluted', canGoTo: ['filter', 'microscope'], color: '#FF9800', needsTreatment: 'filter' },
    contaminated: { name: 'Contaminated', canGoTo: ['boiling-pot', 'microscope'], color: '#F44336', needsTreatment: 'boiling-pot' },
    toxic: { name: 'Toxic', canGoTo: ['microscope'], color: '#9C27B0' }, // For fake clean water
    'fake-clean-polluted': { name: 'Clean (Fake)', canGoTo: ['microscope'], color: '#4A90E2', actualType: 'polluted' },
    'fake-clean-contaminated': { name: 'Clean (Fake)', canGoTo: ['microscope'], color: '#4A90E2', actualType: 'contaminated' }
};

// Add a global variable to track if the player has won
let playerHasWon = false;

// Initialize game
function initializeGame() {
    gameActive = true;
    
    // Reset progressive system
    currentRuleLevel = 1;
    dropsCollected = 0;
    availableWaterTypes = ['clean'];
    seenWaterTypes = new Set(['clean']);
    
    // Reset timer system
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
    timeRemaining = 120;
    timerStarted = false;
    updateTimerDisplay();
    
    // Initialize rules panel
    initializeRulesPanel();
    
    generateWaterDrops();
    
    // Add click listener to the whole document
    document.addEventListener('click', handleDocumentClick);
    
    // Add mouse move listener for following drop
    document.addEventListener('mousemove', handleMouseMove);
    
    // Initialize tool status displays
    updateToolStatus('microscope', 'Available');
    updateToolStatus('filter', 'Available');
    updateToolStatus('boiling-pot', 'Available');
    
    // Initialize water level display
    updateWaterLevel();
    
    // Add click handlers to tools for opening empty dialogs
    addToolClickHandlers();
}

// Generate all water drops in a horizontal row
function generateWaterDrops() {
    const catchmentZone = document.querySelector('.water-catchment-zone');
    
    // Clear any existing drops
    catchmentZone.innerHTML = '';
    waterDrops = [];
    
    // Create 4 water drops with random types (including fake clean water)
    for (let i = 0; i < 4; i++) {
        createRandomWaterDrop(i);
    }
}

// Create a single random water drop at specified position
function createRandomWaterDrop(position) {
    const catchmentZone = document.querySelector('.water-catchment-zone');
    
    // Update available water types based on drops collected
    updateAvailableWaterTypes();
    
    // Use only available water types based on current progression
    const randomType = availableWaterTypes[Math.floor(Math.random() * availableWaterTypes.length)];
    
    // Check if this is a new water type we haven't seen before
    checkForNewWaterType(randomType);
    
    const drop = document.createElement('div');
    // Visual appearance: fake-clean types look clean, others show their actual type
    let visualClass = randomType;
    if (randomType.includes('fake-clean')) {
        visualClass = 'clean';
    }
    drop.className = `water-drop ${visualClass}`;
    drop.id = `drop-${position}`;
    drop.dataset.position = position;
    drop.dataset.actualType = randomType; // Store the actual type
    
    // Add click handler
    drop.addEventListener('click', (e) => {
        e.stopPropagation();
        selectWaterDrop(drop);
    });
    
    // Add to DOM
    catchmentZone.appendChild(drop);
    
    // Update waterDrops array
    waterDrops[position] = drop;
}

// Handle selecting a water drop
function selectWaterDrop(drop) {
    const position = parseInt(drop.dataset.position);
    const actualType = drop.dataset.actualType;
    
    // Start timer on first drop click
    if (!timerStarted) {
        startGameTimer();
        timerStarted = true;
    }
    
    selectedDrop = {
        type: actualType,
        visualType: drop.className.replace('water-drop ', ''),
        element: drop
    };
    

    
    // Remove the drop from catchment zone
    drop.remove();
    
    // Immediately replace with a new random drop
    createRandomWaterDrop(position);
    
    // Create a following drop that will follow the mouse
    createFollowingDrop();
    
    // Change cursor to indicate a drop is selected
    document.body.style.cursor = 'none';
}

// Handle document click to place the selected drop
function handleDocumentClick(e) {
    if (!selectedDrop || e.target.classList.contains('water-drop')) return;
    
    const validDropZone = getValidDropZone(e.clientX, e.clientY);
    
    if (!validDropZone) {
        showInvalidDropFeedback();
        return;
    }
    
    // Check if this drop type can go to this zone
    if (!canDropGoToZone(selectedDrop.type, validDropZone)) {
        showInvalidDropFeedback();
        return;
    }
    
    // Remove the following drop
    if (followingDrop) {
        followingDrop.remove();
        followingDrop = null;
    }
    
    // Handle the drop based on the zone
    handleWaterDrop(validDropZone, e.clientX, e.clientY);
    
    // Reset selection
    selectedDrop = null;
    document.body.style.cursor = 'default';
}

// Check if a drop type can go to a specific zone
function canDropGoToZone(dropType, dropZone) {
    const waterTypeInfo = WATER_TYPES[dropType];
    if (!waterTypeInfo) return false;
    
    if (dropZone.type === 'reservoir') {
        return waterTypeInfo.canGoTo.includes('reservoir');
    } else if (dropZone.type === 'tool') {
        return waterTypeInfo.canGoTo.includes(dropZone.subType);
    }
    
    return false;
}

// Create a drop that follows the mouse cursor
function createFollowingDrop() {
    if (!selectedDrop) return;
    
    followingDrop = document.createElement('div');
    followingDrop.className = `water-drop ${selectedDrop.visualType}`;
    followingDrop.style.position = 'absolute';
    followingDrop.style.pointerEvents = 'none';
    followingDrop.style.zIndex = '9999';
    followingDrop.style.transition = 'none';
    
    document.body.appendChild(followingDrop);
}

// Handle mouse movement to make drop follow cursor
function handleMouseMove(e) {
    if (followingDrop) {
        followingDrop.style.left = (e.clientX - 30) + 'px';
        followingDrop.style.top = (e.clientY - 30) + 'px';
        
        updateDropZoneHighlight(e.clientX, e.clientY);
    }
}

// Check if coordinates are in a valid drop zone
function getValidDropZone(x, y) {
    const reservoir = document.querySelector('.reservoir');
    
    // Check reservoir bounds
    if (reservoir) {
        const reservoirRect = reservoir.getBoundingClientRect();
        if (x >= reservoirRect.left && x <= reservoirRect.right &&
            y >= reservoirRect.top && y <= reservoirRect.bottom) {
            return { type: 'reservoir', element: reservoir };
        }
    }
    
    // Check individual tool bounds (excluding emergency quiz)
    const toolItems = document.querySelectorAll('.tool-item:not(.emergency)');
    for (let i = 0; i < toolItems.length; i++) {
        const tool = toolItems[i];
        const toolRect = tool.getBoundingClientRect();
        if (x >= toolRect.left && x <= toolRect.right &&
            y >= toolRect.top && y <= toolRect.bottom) {
            let toolType = 'microscope';
            const img = tool.querySelector('img');
            if (img) {
                if (img.src.includes('microscope')) toolType = 'microscope';
                else if (img.src.includes('filter')) toolType = 'filter';
                else if (img.src.includes('pot')) toolType = 'boiling-pot';
            }
            return { type: 'tool', subType: toolType, element: tool };
        }
    }
    
    return null;
}

// Handle water drop placement in valid zones
function handleWaterDrop(dropZone, x, y) {
    const waterType = selectedDrop.type;
    
    if (dropZone.type === 'reservoir') {
        handleReservoirDrop(waterType, x, y);
    } else if (dropZone.type === 'tool') {
        handleToolDrop(waterType, dropZone.subType, x, y);
    }
}

// Handle dropping water into reservoir
function handleReservoirDrop(waterType, x, y) {
    console.log(`Dropped ${waterType} water into reservoir`);
    
    // Create visual feedback drop
    const newDrop = document.createElement('div');
    newDrop.className = `water-drop ${selectedDrop.visualType}`;
    newDrop.style.position = 'absolute';
    newDrop.style.left = (x - 30) + 'px';
    newDrop.style.top = (y - 30) + 'px';
    document.body.appendChild(newDrop);
    
    // Game logic based on water type
    if (waterType === 'clean') {
        console.log('Clean water added to reservoir!');
        waterLevel = Math.min(waterLevel + 1, 20); // Increase water level, max 20
        dropsCollected++; // Track total drops collected
        updateWaterLevel();
        
        // Check for rule progression
        checkRuleProgression();
        
        // Check for win condition
        if (waterLevel >= 20 && !playerHasWon) {
            console.log('WIN CONDITION: waterLevel >= 20');
            
            // Mark player as having won to prevent duplicate win screens
            playerHasWon = true;
            
            // Stop the timer immediately and set game inactive
            gameActive = false;
            if (gameTimer) {
                clearInterval(gameTimer);
                gameTimer = null;
                console.log('WIN CONDITION: Timer stopped');
            }
            
            console.log('WIN CONDITION: Showing win screen');
            
            // Hide all screens first
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
                console.log('Removed active from', screen.id);
            });
            
            // Explicitly hide loss screen
            document.getElementById('lossScreen').classList.remove('active');
            document.getElementById('lossScreen').style.display = 'none';
            
            // Show win screen
            const winScreen = document.getElementById('winScreen');
            winScreen.classList.add('active');
            console.log('Added active to winScreen:', winScreen.className);
            
            // Clear any following drops
            if (followingDrop) {
                followingDrop.remove();
                followingDrop = null;
            }
            
            // Reset cursor
            document.body.style.cursor = 'default';
            
            // Trigger celebration effects
            setTimeout(() => {
                createConfettiCelebration();
                createCelebrationBurst();
            }, 500);
        }
    } else {
        console.log('Warning: Contaminated water added to reservoir!');
        // Could add negative effects here
    }
    
    // Remove visual drop after animation
    setTimeout(() => {
        if (newDrop.parentNode) {
            newDrop.remove();
        }
    }, 1500);
}

// Handle dropping water into specific tool
function handleToolDrop(waterType, toolType, x, y) {
    console.log(`Dropped ${waterType} water into ${toolType}`);
    
    // Store the drop in the tool
    toolDrops[toolType] = {
        type: waterType,
        visualType: selectedDrop.visualType,
        timestamp: Date.now()
    };
    
    // Show tool dialog based on tool type
    showToolDialog(toolType, waterType);
}

// Show tool dialog based on tool type
function showToolDialog(toolType, waterType = null) {
    hideAllDialogs();
    
    const dialogId = `${toolType}-dialog`;
    const dialog = document.getElementById(dialogId);
    if (dialog) {
        // Check if there's already a drop in this tool
        const storedDrop = toolDrops[toolType];
        const dropToUse = waterType || (storedDrop ? storedDrop.type : null);
        
        if (dropToUse) {
            // Add the water drop to the sample area
            addDropToSampleArea(dialogId, dropToUse, storedDrop);
            
            // Show analysis results immediately for microscope
            if (toolType === 'microscope') {
                showMicroscopeAnalysis(dropToUse);
            } else {
                // For filter and boiling pot, show initial status
                showTreatmentStatus(toolType, dropToUse, 'ready');
            }
        } else {
            // No drop in tool, show empty state
            resetDialogToDefault(toolType);
        }
        
        dialog.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Add water drop to sample area in dialog
function addDropToSampleArea(dialogId, waterType, storedDrop = null) {
    const dialog = document.getElementById(dialogId);
    const sampleArea = dialog.querySelector('.sample-area .sample-drop');
    
    if (sampleArea) {
        // Clear existing content
        sampleArea.innerHTML = '';
        
        // Create the water drop
        const drop = document.createElement('div');
        // Use stored visual type if available, otherwise use current selectedDrop
        const visualType = storedDrop ? storedDrop.visualType : (selectedDrop ? selectedDrop.visualType : waterType);
        drop.className = `water-drop ${visualType}`;
        drop.dataset.actualType = waterType;
        drop.style.position = 'relative';
        drop.style.cursor = 'pointer';
        
        // Add click handler to collect the drop
        drop.addEventListener('click', () => {
            collectDropFromTool(dialogId, waterType);
        });
        
        sampleArea.appendChild(drop);
    }
}

// Show microscope analysis results
function showMicroscopeAnalysis(waterType) {
    const dialog = document.getElementById('microscope-dialog');
    const processSection = dialog.querySelector('.process-section');
    
    let analysisResult = '';
    let statusText = '';
    let treatmentText = '';
    let actualType = waterType;
    
    // Handle fake clean water - reveal true nature
    if (waterType.includes('fake-clean')) {
        actualType = WATER_TYPES[waterType].actualType;
        analysisResult = `Fake Clean Water Detected!`;
        statusText = `Actually: ${WATER_TYPES[actualType].name}`;
        treatmentText = `Treatment: ${actualType === 'polluted' ? 'Filtration Required' : 'Boiling Required'}`;
        
        // Update the drop in sample area to show true type
        const sampleDrop = dialog.querySelector('.sample-drop .water-drop');
        if (sampleDrop) {
            sampleDrop.className = `water-drop ${actualType}`;
            sampleDrop.dataset.actualType = actualType;
        }
        
        // Update selectedDrop for when it's returned to mouse
        selectedDrop.type = actualType;
        selectedDrop.visualType = actualType;
    } else {
        analysisResult = `${WATER_TYPES[waterType].name} Water`;
        if (waterType === 'clean') {
            statusText = 'Safe for consumption';
            treatmentText = 'Treatment: None Required';
        } else {
            statusText = `Requires ${waterType === 'polluted' ? 'filtration' : 'boiling'}`;
            treatmentText = `Treatment: ${waterType === 'polluted' ? 'Filtration Required' : 'Boiling Required'}`;
        }
    }
    
    // Update the process section
    const h3 = processSection.querySelector('h3');
    const processStatus = processSection.querySelector('.process-status span');
    const resultText = processSection.querySelector('.result-text');
    
    if (h3) h3.textContent = 'Analysis Results:';
    if (processStatus) processStatus.textContent = `Water Quality: ${analysisResult}`;
    if (resultText) resultText.textContent = treatmentText;
    
    // Update progress bar to show 100% analysis complete
    const progressFill = processSection.querySelector('.progress-fill');
    const timeLabel = processSection.querySelector('.time-label');
    if (progressFill) progressFill.style.width = '100%';
    if (timeLabel) timeLabel.textContent = 'Analysis: Complete';
    
    // Update the collect button text based on analysis results
    const collectBtn = dialog.querySelector('.collect-btn');
    if (collectBtn) {
        if (waterType === 'clean' || (waterType.includes('fake-clean') && actualType === 'clean')) {
            collectBtn.textContent = 'Collect Clean Water';
        } else if (actualType === 'polluted' || waterType === 'polluted') {
            collectBtn.textContent = 'Collect for Filtration';
        } else if (actualType === 'contaminated' || waterType === 'contaminated') {
            collectBtn.textContent = 'Collect for Boiling';
        } else {
            collectBtn.textContent = 'Collect Sample';
        }
    }
}

// Show treatment status for filter and boiling pot
function showTreatmentStatus(toolType, waterType, status) {
    const dialogId = `${toolType}-dialog`;
    const dialog = document.getElementById(dialogId);
    const processSection = dialog.querySelector('.process-section');
    
    const h3 = processSection.querySelector('h3');
    const processStatus = processSection.querySelector('.process-status span');
    const resultText = processSection.querySelector('.result-text');
    const progressFill = processSection.querySelector('.progress-fill');
    const timeLabel = processSection.querySelector('.time-label');
    const collectBtn = dialog.querySelector('.collect-btn');
    
    if (status === 'ready') {
        if (h3) h3.textContent = `${toolType === 'filter' ? 'Filtration' : 'Boiling'} Results:`;
        if (processStatus) processStatus.textContent = `Status: Ready to ${toolType === 'filter' ? 'Filter' : 'Boil'}`;
        if (resultText) resultText.textContent = `Click "${toolType === 'filter' ? 'Filter Water' : 'Start Boiling'}" to begin`;
        if (progressFill) progressFill.style.width = '0%';
        if (timeLabel) timeLabel.textContent = 'Time: Ready';
        
        // Update button text and enable it
        if (collectBtn) {
            collectBtn.disabled = false;
            if (toolType === 'filter') {
                collectBtn.textContent = 'Filter Water';
            } else {
                collectBtn.textContent = 'Start Boiling';
            }
        }
    }
}

// Start treatment process (filter or boiling)
function startTreatment(toolType) {
    const dialogId = `${toolType}-dialog`;
    const dialog = document.getElementById(dialogId);
    const button = dialog.querySelector('.collect-btn');
    
    // Disable the button during processing
    if (button) {
        button.disabled = true;
        button.textContent = toolType === 'filter' ? 'Filtering...' : 'Boiling...';
    }
    
    // Update tool status
    updateToolStatus(toolType, 'In Use');
    
    // Set processing time (filter: 3 seconds, boiling: 5 seconds)
    const processingTime = toolType === 'filter' ? 3000 : 5000;
    let progress = 0;
    const interval = 100; // Update every 100ms
    const increment = (interval / processingTime) * 100;
    
    currentProcessingTool = toolType;
    
    // Update progress bar
    const progressTimer = setInterval(() => {
        progress += increment;
        updateTreatmentProgress(toolType, progress);
        
        if (progress >= 100) {
            clearInterval(progressTimer);
            completeTreatment(toolType);
        }
    }, interval);
}

// Update treatment progress
function updateTreatmentProgress(toolType, progress) {
    const dialogId = `${toolType}-dialog`;
    const dialog = document.getElementById(dialogId);
    const progressFill = dialog.querySelector('.progress-fill');
    const timeLabel = dialog.querySelector('.time-label');
    const processStatus = dialog.querySelector('.process-status span');
    
    if (progressFill) progressFill.style.width = `${Math.min(progress, 100)}%`;
    
    const remainingTime = Math.ceil(((100 - progress) / 100) * (toolType === 'filter' ? 3 : 5));
    if (timeLabel) timeLabel.textContent = `Time remaining: ${remainingTime}s`;
    
    if (processStatus) {
        if (toolType === 'filter') {
            processStatus.textContent = 'Status: Removing Pollutants';
        } else {
            processStatus.textContent = 'Temperature: 100°C - Sterilizing';
        }
    }
}

// Complete treatment process
function completeTreatment(toolType) {
    const dialogId = `${toolType}-dialog`;
    const dialog = document.getElementById(dialogId);
    const button = dialog.querySelector('.collect-btn');
    const sampleArea = dialog.querySelector('.sample-drop');
    const resultText = dialog.querySelector('.result-text');
    const timeLabel = dialog.querySelector('.time-label');
    
    // Update stored drop to clean water
    if (toolDrops[toolType]) {
        toolDrops[toolType].type = 'clean';
        toolDrops[toolType].visualType = 'clean';
    }
    
    // Update UI to show completion
    if (button) {
        button.disabled = false;
        button.textContent = 'Collect Clean Water';
    }
    
    if (resultText) {
        resultText.textContent = toolType === 'filter' ? 'Pollutants Successfully Removed' : 'Bacteria & Germs Eliminated';
    }
    
    if (timeLabel) timeLabel.textContent = 'Treatment: Complete';
    
    // Replace the drop in sample area with clean water
    if (sampleArea) {
        sampleArea.innerHTML = '';
        const cleanDrop = document.createElement('div');
        cleanDrop.className = 'water-drop clean';
        cleanDrop.dataset.actualType = 'clean';
        cleanDrop.style.position = 'relative';
        cleanDrop.style.cursor = 'pointer';
        
        // Add click handler to collect the clean water
        cleanDrop.addEventListener('click', () => {
            collectDropFromTool(dialogId, 'clean');
        });
        
        sampleArea.appendChild(cleanDrop);
    }
    
    // Update tool status
    updateToolStatus(toolType, 'Ready');
    currentProcessingTool = null;
}

// Collect drop from tool (clicking on drop in sample area)
function collectDropFromTool(dialogId, waterType) {
    const toolType = dialogId.replace('-dialog', '');
    
    // Remove drop from tool storage
    toolDrops[toolType] = null;
    
    // Return drop to mouse cursor
    returnDropToMouse(waterType);
    
    // Close dialog
    closeDialog(dialogId);
}

// Return drop to mouse cursor
function returnDropToMouse(waterType) {
    selectedDrop = {
        type: waterType,
        visualType: waterType,
        element: null
    };
    
    createFollowingDrop();
    document.body.style.cursor = 'none';
}

// Update tool status display
function updateToolStatus(toolType, status) {
    // Find the tool item
    const toolItems = document.querySelectorAll('.tool-item');
    let targetTool = null;
    
    toolItems.forEach(tool => {
        const img = tool.querySelector('img');
        if (img) {
            if ((toolType === 'microscope' && img.src.includes('microscope')) ||
                (toolType === 'filter' && img.src.includes('filter')) ||
                (toolType === 'boiling-pot' && img.src.includes('pot'))) {
                targetTool = tool;
            }
        }
    });
    
    if (targetTool) {
        const statusElement = targetTool.querySelector('.tool-status');
        if (statusElement) {
            statusElement.textContent = status;
            
            // Update status class
            statusElement.className = 'tool-status';
            if (status === 'Available' || status === 'Ready') {
                statusElement.classList.add('available');
            } else if (status === 'In Use') {
                statusElement.classList.add('in-use');
            }
        }
    }
}

// Show feedback for invalid drop attempts
function showInvalidDropFeedback() {
    console.log('Invalid drop zone! This water type cannot go there.');
    
    if (followingDrop) {
        followingDrop.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            if (followingDrop) {
                followingDrop.style.animation = '';
            }
        }, 500);
    }
}

// Update visual feedback for drop zones
function updateDropZoneHighlight(x, y) {
    const validZone = getValidDropZone(x, y);
    const reservoir = document.querySelector('.reservoir');
    const toolsPanel = document.querySelector('.tools-panel');
    
    // Remove existing highlights
    if (reservoir) reservoir.style.filter = '';
    if (toolsPanel) toolsPanel.style.filter = '';
    
    // Check if the drop can actually go to this zone
    if (validZone && selectedDrop && canDropGoToZone(selectedDrop.type, validZone)) {
        if (validZone.type === 'reservoir') {
            validZone.element.style.filter = 'brightness(1.2) drop-shadow(0 0 10px #4A90E2)';
        }
    }
}

// Hide all tool dialogs
function hideAllDialogs() {
    const dialogs = document.querySelectorAll('.tool-dialog');
    dialogs.forEach(dialog => {
        dialog.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Close dialog when clicking outside or on close button
function closeDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    if (dialog) {
        dialog.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Add click handlers to tools for opening empty dialogs
function addToolClickHandlers() {
    const toolItems = document.querySelectorAll('.tool-item:not(.emergency)');
    
    toolItems.forEach(tool => {
        tool.addEventListener('click', (e) => {
            // Don't open dialog if a drop is being dragged
            if (selectedDrop) return;
            
            const img = tool.querySelector('img');
            let toolType = 'microscope';
            
            if (img) {
                if (img.src.includes('microscope')) toolType = 'microscope';
                else if (img.src.includes('filter')) toolType = 'filter';
                else if (img.src.includes('pot')) toolType = 'boiling-pot';
            }
            
            // Show empty dialog
            showEmptyToolDialog(toolType);
        });
    });
}

// Show empty tool dialog
function showEmptyToolDialog(toolType) {
    // Check if there's already a drop in this tool
    if (toolDrops[toolType]) {
        // Show dialog with existing drop
        showToolDialog(toolType);
        return;
    }
    
    hideAllDialogs();
    
    const dialogId = `${toolType}-dialog`;
    const dialog = document.getElementById(dialogId);
    if (dialog) {
        // Clear the sample area
        const sampleArea = dialog.querySelector('.sample-area .sample-drop');
        if (sampleArea) {
            sampleArea.innerHTML = '';
        }
        
        // Reset the process section to default state
        resetDialogToDefault(toolType);
        
        dialog.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Reset dialog to default empty state
function resetDialogToDefault(toolType) {
    const dialogId = `${toolType}-dialog`;
    const dialog = document.getElementById(dialogId);
    const processSection = dialog.querySelector('.process-section');
    
    if (toolType === 'microscope') {
        const h3 = processSection.querySelector('h3');
        const processStatus = processSection.querySelector('.process-status span');
        const resultText = processSection.querySelector('.result-text');
        const progressFill = processSection.querySelector('.progress-fill');
        const timeLabel = processSection.querySelector('.time-label');
        const collectBtn = dialog.querySelector('.collect-btn');
        
        if (h3) h3.textContent = 'Analysis Results:';
        if (processStatus) processStatus.textContent = 'No sample loaded';
        if (resultText) resultText.textContent = 'Place a water drop to analyze';
        if (progressFill) progressFill.style.width = '0%';
        if (timeLabel) timeLabel.textContent = 'Ready for analysis';
        if (collectBtn) collectBtn.textContent = 'No Sample';
    } else if (toolType === 'filter') {
        const h3 = processSection.querySelector('h3');
        const processStatus = processSection.querySelector('.process-status span');
        const resultText = processSection.querySelector('.result-text');
        const progressFill = processSection.querySelector('.progress-fill');
        const timeLabel = processSection.querySelector('.time-label');
        const collectBtn = dialog.querySelector('.collect-btn');
        
        if (h3) h3.textContent = 'Filtration Results:';
        if (processStatus) processStatus.textContent = 'No polluted water loaded';
        if (resultText) resultText.textContent = 'Place polluted water to filter';
        if (progressFill) progressFill.style.width = '0%';
        if (timeLabel) timeLabel.textContent = 'Ready to filter';
        if (collectBtn) {
            collectBtn.textContent = 'No Sample';
            collectBtn.disabled = true;
        }
    } else if (toolType === 'boiling-pot') {
        const h3 = processSection.querySelector('h3');
        const processStatus = processSection.querySelector('.process-status span');
        const resultText = processSection.querySelector('.result-text');
        const progressFill = processSection.querySelector('.progress-fill');
        const timeLabel = processSection.querySelector('.time-label');
        const collectBtn = dialog.querySelector('.collect-btn');
        
        if (h3) h3.textContent = 'Boiling Results:';
        if (processStatus) processStatus.textContent = 'No contaminated water loaded';
        if (resultText) resultText.textContent = 'Place contaminated water to boil';
        if (progressFill) progressFill.style.width = '0%';
        if (timeLabel) timeLabel.textContent = 'Ready to boil';
        if (collectBtn) {
            collectBtn.textContent = 'No Sample';
            collectBtn.disabled = true;
        }
    }
}

// Add event listeners for treatment buttons
document.addEventListener('DOMContentLoaded', function() {
    // Filter button
    const filterBtn = document.querySelector('#filter-dialog .collect-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            if (filterBtn.disabled || filterBtn.textContent === 'No Sample') {
                return; // Do nothing if disabled or no sample
            }
            if (filterBtn.textContent === 'Filter Water') {
                startTreatment('filter');
            } else if (filterBtn.textContent === 'Collect Clean Water') {
                // Same as clicking the drop - collect the clean water
                toolDrops.filter = null;
                returnDropToMouse('clean');
                closeDialog('filter-dialog');
            }
        });
    }
    
    // Boiling button
    const boilingBtn = document.querySelector('#boiling-pot-dialog .collect-btn');
    if (boilingBtn) {
        boilingBtn.addEventListener('click', () => {
            if (boilingBtn.disabled || boilingBtn.textContent === 'No Sample') {
                return; // Do nothing if disabled or no sample
            }
            if (boilingBtn.textContent === 'Start Boiling') {
                startTreatment('boiling-pot');
            } else if (boilingBtn.textContent === 'Collect Clean Water') {
                // Same as clicking the drop - collect the clean water
                toolDrops['boiling-pot'] = null;
                returnDropToMouse('clean');
                closeDialog('boiling-pot-dialog');
            }
        });
    }
    
    // Microscope button (for consistency)
    const microscopeBtn = document.querySelector('#microscope-dialog .collect-btn');
    if (microscopeBtn) {
        microscopeBtn.addEventListener('click', () => {
            if (microscopeBtn.textContent === 'No Sample') {
                return; // Do nothing if no sample
            }
            // Get the current drop type from the sample area
            const sampleDrop = document.querySelector('#microscope-dialog .sample-drop .water-drop');
            if (sampleDrop) {
                const dropType = sampleDrop.dataset.actualType || 'clean';
                // Remove drop from tool storage
                toolDrops.microscope = null;
                returnDropToMouse(dropType);
                closeDialog('microscope-dialog');
            }
        });
    }
});

// Weather system
const weatherConditions = [
    'Precipitation-free, Humid',
    'Light Rain, Cool',
    'Heavy Rain, Cold',
    'Sunny, Dry',
    'Cloudy, Mild',
    'Stormy, Windy',
    'Foggy, Damp',
    'Clear Skies, Warm'
];

function rollWeather() {
    // Weather system disabled - coming soon
    console.log('Weather system coming soon!');
    return;
}

// Water level system
function updateWaterLevel() {
    const waterLevelFill = document.getElementById('waterLevelFill');
    const waterLevelText = document.getElementById('waterLevelText');
    
    if (waterLevelFill && waterLevelText) {
        const percentage = (waterLevel / 20) * 100;
        waterLevelFill.style.width = `${percentage}%`;
        waterLevelText.textContent = `${waterLevel}/20 drops`;
        
        // Change color based on level
        if (waterLevel >= 15) {
            waterLevelFill.style.background = 'linear-gradient(90deg, #4CAF50, #45A049)'; // Green
        } else if (waterLevel >= 10) {
            waterLevelFill.style.background = 'linear-gradient(90deg, #4A90E2, #357ABD)'; // Blue
        } else if (waterLevel >= 5) {
            waterLevelFill.style.background = 'linear-gradient(90deg, #FF9800, #F57C00)'; // Orange
        } else {
            waterLevelFill.style.background = 'linear-gradient(90deg, #F44336, #D32F2F)'; // Red
        }
    }
}

// Add CSS for dice roll animation
const style = document.createElement('style');
style.textContent = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);

// Progressive Rule System
const RULES = [
    {
        id: 1,
        title: "Fill reservoir to 20 drops",
        description: "Tap on clean water droplets to collect them. Tap again to drop into reservoir.",
        icon: "💧",
        color: "#4A90E2",
        triggerAt: 0, // Show immediately
        waterType: 'clean',
        realWorldFact: "Access to clean water is a basic human right, yet 2 billion people worldwide still lack safely managed drinking water at home."
    },
    {
        id: 2,
        title: "Complete within 2 minutes",
        description: "Timer starts when you click your first droplet. This BETA timer will be replaced by a more complex survival mechanism soon.",
        icon: "⏰",
        color: "#FF6B35",
        triggerAt: 0, // Show immediately with rule 1
        waterType: 'timer',
        realWorldFact: "In water-scarce regions, families often have limited time windows to collect water before sources dry up or become inaccessible."
    },
    {
        id: 3,
        title: "Polluted water exists",
        description: "Murky blue droplets are polluted. Use Filter Device to purify before collecting.",
        icon: "🌫️",
        color: "#5A9BD4",
        unlockAt: 3, // Unlock polluted water after collecting 3 drops
        waterType: 'polluted',
        realWorldFact: "Every day, 1,000 children under age 5 die from diarrhea caused by contaminated water, poor sanitation, and unsafe hygiene practices."
    },
    {
        id: 4,
        title: "Contaminated water exists",
        description: "Brown droplets with bacteria (🦠) are contaminated. Use Boiling Pot to sterilize before collecting.",
        icon: "🦠",
        color: "#8B4513",
        unlockAt: 6, // Unlock contaminated water after collecting 6 drops
        waterType: 'contaminated',
        realWorldFact: "Waterborne diseases like cholera, typhoid, and dysentery affect millions annually. Boiling water for 1 minute kills most disease-causing organisms."
    },
    {
        id: 5,
        title: "Fake Clean water exists",
        description: "Some clean-looking water is fake! Use Microscope to inspect before collecting.",
        icon: "🔬",
        color: "#9C27B0",
        unlockAt: 9, // Unlock fake clean water after collecting 9 drops
        waterType: 'fake-clean',
        realWorldFact: "Clear water isn't always safe water. Invisible contaminants like bacteria, viruses, and chemicals can make seemingly clean water deadly."
    }
];

// Water type progression based on drops collected
const WATER_TYPE_PROGRESSION = [
    { dropsNeeded: 0, types: ['clean'] },
    { dropsNeeded: 3, types: ['clean', 'polluted'] },
    { dropsNeeded: 6, types: ['clean', 'polluted', 'contaminated'] },
    { dropsNeeded: 9, types: ['clean', 'polluted', 'contaminated', 'fake-clean-polluted', 'fake-clean-contaminated'] }
];

function initializeRulesPanel() {
    const rulesPanel = document.querySelector('.rules-panel');
    if (rulesPanel) {
        rulesPanel.innerHTML = '<h3>RULES</h3><div class="rules-list"></div>';
        
        // Show first two rules immediately
        addRule(1);
        addRule(2);
    }
}

function updateAvailableWaterTypes() {
    // Find the current progression level based on drops collected
    for (let i = WATER_TYPE_PROGRESSION.length - 1; i >= 0; i--) {
        if (dropsCollected >= WATER_TYPE_PROGRESSION[i].dropsNeeded) {
            availableWaterTypes = [...WATER_TYPE_PROGRESSION[i].types];
            break;
        }
    }
}

function checkForNewWaterType(waterType) {
    // Get the base water type (remove fake-clean prefix if present)
    let baseType = waterType;
    if (waterType.startsWith('fake-clean')) {
        baseType = 'fake-clean';
    }
    
    // If we haven't seen this water type before, show its rule
    if (!seenWaterTypes.has(baseType)) {
        seenWaterTypes.add(baseType);
        
        // Find the rule for this water type
        const rule = RULES.find(r => r.waterType === baseType);
        if (rule) {
            addRule(rule.id);
            if (rule.id > currentRuleLevel) {
                currentRuleLevel = rule.id;
            }
            showRuleNotification(rule);
        }
    }
}

function checkRuleProgression() {
    // This function is now called from handleReservoirDrop but doesn't add rules
    // Rules are only added when new water types are first seen in checkForNewWaterType
}

function addRule(ruleId) {
    const rule = RULES.find(r => r.id === ruleId);
    if (!rule) return;
    
    const rulesList = document.querySelector('.rules-list');
    if (!rulesList) return;
    
    const ruleElement = document.createElement('div');
    ruleElement.className = 'rule-item';
    ruleElement.innerHTML = `
        <div class="rule-icon" style="background-color: ${rule.color}">
            ${rule.icon}
        </div>
        <div class="rule-content">
            <h4>${rule.title}</h4>
            <p>${rule.description}</p>
        </div>
    `;
    
    // Add animation class
    ruleElement.style.opacity = '0';
    ruleElement.style.transform = 'translateY(-20px)';
    
    rulesList.appendChild(ruleElement);
    
    // Animate in
    setTimeout(() => {
        ruleElement.style.transition = 'all 0.5s ease-out';
        ruleElement.style.opacity = '1';
        ruleElement.style.transform = 'translateY(0)';
    }, 100);
}

function showRuleNotification(rule) {
    // Create notification popup
    const notification = document.createElement('div');
    notification.className = 'rule-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon" style="background-color: ${rule.color}">
                ${rule.icon}
            </div>
            <div class="notification-text">
                <h3>New Rule Added!</h3>
                <h4>${rule.title}</h4>
                <p>${rule.description}</p>
                ${rule.realWorldFact ? `<div class="real-world-fact">
                    <strong>💡 Real World:</strong> ${rule.realWorldFact}
                </div>` : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 8 seconds (longer duration)
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-50px)';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }
    }, 8000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-50px)';
        setTimeout(() => {
            notification.remove();
        }, 500);
    });
}

// Timer System Functions
function startGameTimer() {
    if (gameTimer) {
        console.log('⏰ Timer already running, not starting another');
        return; // Already started
    }
    
    gameTimer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            console.log('TIMER: timeRemaining <= 0');
            // Stop the timer
            clearInterval(gameTimer);
            gameTimer = null;
            
            // If player hasn't won, show loss screen
            if (waterLevel < 20 && !playerHasWon) {
                gameActive = false;
                showLossScreen();
            }
        }
    }, 1000);
    
    console.log('⏰ Game timer started! 2 minutes to complete.');
}

function updateTimerDisplay() {
    const timerElement = document.querySelector('.game-timer');
    if (timerElement) {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        timerElement.textContent = formattedTime;
        
        // Change color based on time remaining
        if (timeRemaining <= 10) {
            timerElement.style.color = '#FF4444';
            timerElement.style.animation = 'pulse 1s infinite';
        } else if (timeRemaining <= 30) {
            timerElement.style.color = '#FF8800';
            timerElement.style.animation = 'none';
        } else {
            timerElement.style.color = '#4A90E2';
            timerElement.style.animation = 'none';
        }
    }
}

// Override these functions to do nothing
function gameOver() {
    console.log('gameOver function called but disabled');
    // Do nothing - we don't want to show the loss screen
    return;
}

function showGameOverScreen() {
    console.log('showGameOverScreen function called but disabled');
    // Do nothing - we don't want to show the loss screen
    return;
}

function tryAgain() {
    // Hide loss screen
    document.getElementById('lossScreen').classList.remove('active');
    document.getElementById('lossScreen').style.display = 'none';
    
    // Reset and restart game
    resetGame();
    startGame();
}

function goToStart() {
    // Hide loss screen
    document.getElementById('lossScreen').classList.remove('active');
    
    // Go to start screen
    resetGame();
}

// Add a function to specifically show the loss screen
function showLossScreen() {
    console.log('Showing loss screen');
    
    // Only show if player hasn't won
    if (playerHasWon) {
        console.log('Player has already won, not showing loss screen');
        return;
    }
    
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show loss screen
    const lossScreen = document.getElementById('lossScreen');
    lossScreen.style.display = 'flex';
    lossScreen.classList.add('active');
}