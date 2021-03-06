/*
 * Copyright (C) 2005-2010 Alfresco Software Limited.
 *
 * This file is part of Alfresco
 *
 * Alfresco is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfresco is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */
package org.alfresco.deployment.impl.server;
import org.alfresco.deployment.impl.server.Housekeeper;

public class DeploymentCommandQueueHousekeeper implements Housekeeper 
{
    /**
     * How many commands to process per "tick",  too many and you may block out other processes.
     */
    private int maxCommandsPerTick = 2;
    
    public void init()
    {
    	
    }
    
	public void poll() {
		
		for(int i = 0; i < getMaxCommandsPerTick(); i++) 
		{	
			Runnable command = commandQueue.pollCommand();
		
			if(command != null)
			{
				command.run();
			}
			else
			{
				break;
			}
		}
	}

	public void setMaxCommandsPerTick(int maxCommandsPerTick) {
		this.maxCommandsPerTick = maxCommandsPerTick;
	}

	public int getMaxCommandsPerTick() {
		return maxCommandsPerTick;
	}
	
	private DeploymentCommandQueue commandQueue;
	
	public void setCommandQueue(DeploymentCommandQueue commandQueue) 
	{
		this.commandQueue = commandQueue;
	}

	public DeploymentCommandQueue getCommandQueue() 
	{
		return commandQueue;
	}
}
